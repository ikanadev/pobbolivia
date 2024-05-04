package main

import (
	"strings"
	"unicode"
)

func panicIfErr(err error) {
	if err != nil {
		panic(err)
	}
}

func parseName(name string) string {
	partial := strings.TrimSpace(name)
	capitalize := true
	var builder strings.Builder

	for _, char := range partial {
		if capitalize {
			builder.WriteRune(unicode.ToTitle(char))
		} else {
			builder.WriteRune(unicode.ToLower(char))
		}
		capitalize = unicode.IsSpace(char)
	}
	return builder.String()
}
