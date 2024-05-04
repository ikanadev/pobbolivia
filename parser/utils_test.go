package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseName(t *testing.T) {
	type testCase struct {
		input    string
		expected string
	}

	cases := []testCase{
		{input: "CóRdobA", expected: "Córdoba"},
		{input: "LA PAZ", expected: "La Paz"},
		{input: "PEDro nU?ez", expected: "Pedro Nuñez"},
		{input: " itiamas   ", expected: "Itiamas"},
	}

	for _, c := range cases {
		newName := parseName(c.input)
		assert.Equal(t, c.expected, newName)
	}
}
