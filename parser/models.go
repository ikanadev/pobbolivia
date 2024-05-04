package main

import (
	"fmt"

	"github.com/google/uuid"
)

type Population map[string]int

type Mun struct {
	ID         uuid.UUID        `json:"id"`
	Name       string           `json:"name"`
	Surface    float64          `json:"surface"`
	Population Population       `json:"population"`
	Coords     [][][][2]float64 `json:"-"`
}

type Prov struct {
	ID         uuid.UUID        `json:"id"`
	Name       string           `json:"name"`
	Surface    float64          `json:"surface"`
	Population Population       `json:"population"`
	Coords     [][][][2]float64 `json:"-"`
	Muns       []Mun            `json:"muns"`
}

func (p Prov) ToString() string {
	return fmt.Sprintf("{Name: %s, Coords: %d} ", p.Name, len(p.Coords))
}

type Dep struct {
	ID         uuid.UUID        `json:"id"`
	Name       string           `json:"name"`
	Surface    float64          `json:"surface"`
	Population Population       `json:"population"`
	Coords     [][][][2]float64 `json:"-"`
	Provs      []Prov           `json:"provs"`
}

func (d Dep) ToString() string {
	return fmt.Sprintf("{Name: %s, Surface: %f, Coords: %d, Provs: %d} ", d.Name, d.Surface, len(d.Coords), len(d.Provs))
}
