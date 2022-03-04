package handlers

import (
	"fmt"
	"net/http"
)

func DummyHandler(w http.ResponseWriter, r *http.Request) {
	tk := r.Header.Get("x-access-token")
	fmt.Println(tk)

}
