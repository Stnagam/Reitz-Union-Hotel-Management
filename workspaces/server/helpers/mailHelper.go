package helpers

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha1"
	"encoding/base32"
	"encoding/binary"
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
	"time"

	mail "github.com/xhit/go-simple-mail"
)

var htmlBody = `
<html>
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <title>Hello, World</title>
</head>
<body>
   <p>Dear User,<br/><br/>At your request, we have reset your password.<br/><br/>Please find below the OTP to reset your password.<br/><br/>{{.otp}}<br/></p>
</body>
`

//Panic if error is not nil
func check(e error) {
	if e != nil {
		panic(e)
	}
}

//Append extra 0s if the length of otp is less than 6
//If otp is "1234", it will return it as "001234"
func prefix0(otp string) string {
	if len(otp) == 6 {
		return otp
	}
	for i := (6 - len(otp)); i > 0; i-- {
		otp = "0" + otp
	}
	return otp
}

func getHOTPToken(secret string, interval int64) string {

	//Converts secret to base32 Encoding. Base32 encoding desires a 32-character
	//subset of the twenty-six letters A–Z and ten digits 0–9
	key, err := base32.StdEncoding.DecodeString(strings.ToUpper(secret))
	check(err)
	bs := make([]byte, 8)
	binary.BigEndian.PutUint64(bs, uint64(interval))

	//Signing the value using HMAC-SHA1 Algorithm
	hash := hmac.New(sha1.New, key)
	hash.Write(bs)
	h := hash.Sum(nil)

	// We're going to use a subset of the generated hash.
	// Using the last nibble (half-byte) to choose the index to start from.
	// This number is always appropriate as it's maximum decimal 15, the hash will
	// have the maximum index 19 (20 bytes of SHA1) and we need 4 bytes.
	o := (h[19] & 15)

	var header uint32
	//Get 32 bit chunk from hash starting at the o
	r := bytes.NewReader(h[o : o+4])
	err = binary.Read(r, binary.BigEndian, &header)

	check(err)
	//Ignore most significant bits as per RFC 4226.
	//Takes division from one million to generate a remainder less than < 7 digits
	h12 := (int(header) & 0x7fffffff) % 1000000

	//Converts number as a string
	otp := strconv.Itoa(int(h12))

	return prefix0(otp)
}

func getTOTPToken(secret string) string {
	//The TOTP token is just a HOTP token seeded with every 30 seconds.
	interval := time.Now().Unix() / 120
	return getHOTPToken(secret, interval)
}

func MailHelper() {

	//Read the secret token from file system
	data, err := ioutil.ReadFile("./dummy_secret.pem")
	check(err)
	secret := string(data)
	otp := getTOTPToken(secret)
	fmt.Println(otp)

	//Copies the otp generated to your clipboard
	//err = exec.Command("bash", "-c", fmt.Sprintf("echo %s | tr -d \"\n, \" | pbcopy", otp)).Run()
	check(err)

	server := mail.NewSMTPClient()
	server.Host = "smtp.mail.yahoo.com"
	server.Port = 587
	server.Username = "reitzunionhotel@yahoo.com"
	server.Password = "yzhskjejxbkzokes"
	server.Encryption = mail.EncryptionTLS

	smtpClient, err := server.Connect()
	if err != nil {
		log.Fatal(err)
	}

	// Create email
	email := mail.NewMSG()
	email.SetFrom("reitzunionhotel@yahoo.com")
	email.AddTo("sheelaippili140@gmail.com")
	email.AddCc("niklausnagam@gmail.com")
	email.SetSubject("reset password otp verfication - Reitz union hotel")

	email.SetBody(mail.TextHTML, htmlBody)
	//email.AddAttachment("super_cool_file.png")

	// Send email
	err = email.Send(smtpClient)
	if err != nil {
		log.Fatal(err)
		fmt.Println("mail could not be sent")
	}
}
