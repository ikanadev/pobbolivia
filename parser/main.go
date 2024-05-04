package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"

	"github.com/google/uuid"
)

func parseDepartamentos() []Dep {
	type fileData struct {
		Features []struct {
			Properties struct {
				Depto   string `json:"DEPARTAMEN"`
				Surface string `json:"superficie"`
			} `json:"properties"`
			Geometry struct {
				Coords [][][][2]float64 `json:"coordinates"`
			} `json:"geometry"`
		} `json:"features"`
	}
	file, err := os.ReadFile("sources/bolivia.json")
	panicIfErr(err)
	var data fileData
	err = json.Unmarshal(file, &data)
	panicIfErr(err)

	deps := make([]Dep, len(data.Features))
	for i := range data.Features {
		surface, err := strconv.ParseFloat(data.Features[i].Properties.Surface, 64)
		panicIfErr(err)
		deps[i].ID = uuid.New()
		deps[i].Name = parseName(data.Features[i].Properties.Depto)
		deps[i].Coords = data.Features[i].Geometry.Coords
		deps[i].Surface = surface
	}
	return deps
}

func parseProvincias(deps *[]Dep) {
	type fileData struct {
		Features []struct {
			Properties struct {
				Depto string `json:"DEPARTAMEN"`
				Prov  string `json:"PROVINCIA"`
			} `json:"properties"`
			Geometry struct {
				Coords [][][][2]float64 `json:"coordinates"`
			} `json:"geometry"`
		} `json:"features"`
	}

	fileContent, err := os.ReadFile("sources/provincias.pretty.json")
	panicIfErr(err)

	var data fileData
	err = json.Unmarshal(fileContent, &data)
	panicIfErr(err)

	for i := range data.Features {
		provData := data.Features[i]

		deptoName := parseName(provData.Properties.Depto)
		provName := parseName(provData.Properties.Prov)
		var depto *Dep
		for i := range *deps {
			if (*deps)[i].Name == deptoName {
				depto = &(*deps)[i]
				break
			}
		}
		if depto == nil {
			fmt.Println("Depto not found", deptoName, provName)
			continue
		}

		depto.Provs = append(depto.Provs, Prov{
			ID:     uuid.New(),
			Name:   provName,
			Coords: provData.Geometry.Coords,
		})
	}
}

func parseMunicipios2001(deps *[]Dep) {
	type fileData struct {
		Features []struct {
			Properties struct {
				Depto      string  `json:"NOMDEPT"`
				Prov       string  `json:"NOM_PROV"`
				Mun        string  `json:"NOM_MUN"`
				Population int     `json:"POB_2001"`
				Surface    float64 `json:"Sup_km2"`
			} `json:"properties"`
			Geometry struct {
				Coords [][][][2]float64 `json:"coordinates"`
			} `json:"geometry"`
		} `json:"features"`
	}

	fileContent, err := os.ReadFile("sources/municipios2001.pretty.json")
	panicIfErr(err)

	var data fileData
	err = json.Unmarshal(fileContent, &data)
	panicIfErr(err)

	for i := range data.Features {
		munData := data.Features[i]
		deptoName := parseName(munData.Properties.Depto)
		provName := parseName(munData.Properties.Prov)
		munName := parseName(munData.Properties.Mun)

		var depto *Dep
		for i := range *deps {
			if (*deps)[i].Name == deptoName {
				depto = &(*deps)[i]
				break
			}
		}
		if depto == nil {
			fmt.Println("Mun depto not found", munData.Properties.Depto, munData.Properties.Prov, munData.Properties.Mun)
			continue
		}

		var prov *Prov
		for i := range depto.Provs {
			if depto.Provs[i].Name == provName {
				prov = &depto.Provs[i]
				break
			}
		}
		if prov == nil {
			fmt.Println("Mun prov not found", munData.Properties.Depto, munData.Properties.Prov, munData.Properties.Mun)
			continue
		}

		prov.Muns = append(prov.Muns, Mun{
			ID:         uuid.New(),
			Name:       munName,
			Surface:    munData.Properties.Surface,
			Population: Population{"2001": munData.Properties.Population},
			Coords:     munData.Geometry.Coords,
		})

	}
}

func parseMunicipios2012(deps *[]Dep) {
	type fileData struct {
		Features []struct {
			Properties struct {
				Depto      string  `json:"NOMDEPT"`
				Prov       string  `json:"NOM_PROV"`
				Mun        string  `json:"NOM_MUN"`
				Population int     `json:"POB_12"`
				Surface    float64 `json:"Sup_km2"`
			} `json:"properties"`
			Geometry struct {
				Coords [][][][2]float64 `json:"coordinates"`
			} `json:"geometry"`
		} `json:"features"`
	}

	fileContent, err := os.ReadFile("sources/municipios2012.pretty.json")
	panicIfErr(err)

	var data fileData
	err = json.Unmarshal(fileContent, &data)
	panicIfErr(err)

	for i := range data.Features {
		munData := data.Features[i]
		deptoName := parseName(munData.Properties.Depto)
		provName := parseName(munData.Properties.Prov)
		munName := parseName(munData.Properties.Mun)

		var depto *Dep
		for i := range *deps {
			if (*deps)[i].Name == deptoName {
				depto = &(*deps)[i]
				break
			}
		}
		if depto == nil {
			fmt.Println("Mun depto not found", munData.Properties.Depto, munData.Properties.Prov, munData.Properties.Mun)
			continue
		}

		var prov *Prov
		for i := range depto.Provs {
			if depto.Provs[i].Name == provName {
				prov = &depto.Provs[i]
				break
			}
		}
		if prov == nil {
			fmt.Println("Mun prov not found", munData.Properties.Depto, munData.Properties.Prov, munData.Properties.Mun)
			continue
		}

		var mun *Mun
		for i := range prov.Muns {
			if prov.Muns[i].Name == munName {
				mun = &prov.Muns[i]
				break
			}
		}
		if mun == nil {
			fmt.Println("Mun not found", munData.Properties.Depto, munData.Properties.Prov, munData.Properties.Mun)
			continue
		}
		if mun.Population == nil {
			fmt.Println("Mun without population", munData.Properties.Depto, munData.Properties.Prov, munData.Properties.Mun)
			continue
		}
		mun.Population["2012"] = munData.Properties.Population
	}
}

func calculateTotals(deps *[]Dep) {
	for i := range *deps {
		var depto *Dep = &(*deps)[i]
		var deptoPopulation map[string]int = make(map[string]int)

		for j := range depto.Provs {
			var prov *Prov = &depto.Provs[j]
			var provSurface float64 = 0
			var provPopulation map[string]int = make(map[string]int)

			for k := range prov.Muns {
				var mun *Mun = &prov.Muns[k]
				provSurface += mun.Surface

				for year, qtty := range mun.Population {
					provPopulation[year] += qtty
				}
			}

			prov.Surface = provSurface
			prov.Population = provPopulation

			for year, qtty := range prov.Population {
				deptoPopulation[year] += qtty
			}
		}

		depto.Population = deptoPopulation
	}
}

func generateCoordFile(coords [][][][2]float64, id uuid.UUID) {
	file, err := os.Create("data/coords/" + id.String() + ".json")
	panicIfErr(err)
	encoder := json.NewEncoder(file)
	err = encoder.Encode(coords)
	panicIfErr(err)
}

func generateCoordFiles(deps []Dep) {
	for _, dep := range deps {
		generateCoordFile(dep.Coords, dep.ID)
		for _, prov := range dep.Provs {
			generateCoordFile(prov.Coords, prov.ID)
			for _, mun := range prov.Muns {
				generateCoordFile(mun.Coords, mun.ID)
			}
		}
	}
}

func main() {
	deps := parseDepartamentos()
	parseProvincias(&deps)
	parseMunicipios2001(&deps)
	parseMunicipios2012(&deps)
	calculateTotals(&deps)
	generateCoordFiles(deps)

	file, err := os.Create("data/departamentos.json")
	panicIfErr(err)
	encoder := json.NewEncoder(file)
	// encoder.SetIndent("", "  ")
	err = encoder.Encode(deps)
	panicIfErr(err)
}
