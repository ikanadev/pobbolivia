package main

import (
	"fmt"
	"path/filepath"
	"strconv"

	"github.com/xuri/excelize/v2"
)

func getStrVal(file *excelize.File, cell string) string {
	strValue, err := file.GetCellValue("report conteo presenta (2)", cell)
	if err != nil {
		panic(err)
	}
	return strValue
}
func getIntVal(file *excelize.File, cell string) int {
	strValue, err := file.GetCellValue("report conteo presenta (2)", cell)
	if err != nil {
		panic(err)
	}
	if len(strValue) == 0 {
		return 0
	}
	value, err := strconv.Atoi(strValue)
	if err != nil {
		panic(err)
	}
	return value
}

type munPob2024 struct {
	mun string
	pob int
}

func parsexls() map[string][]munPob2024 {
	filePath := filepath.Join("sources", "censo2024.xlsx")
	file, err := excelize.OpenFile(filePath, excelize.Options{RawCellValue: true})
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := file.Close(); err != nil {
			panic(err)
		}
	}()

	result := make(map[string][]munPob2024)
	type deptoRange struct {
		depto      string
		start, end int
	}
	deptoRanges := []deptoRange{
		{depto: "Chuquisaca", start: 12, end: 40},
		{depto: "La Paz", start: 42, end: 128},
		{depto: "Cochabamba", start: 130, end: 177},
		{depto: "Oruro", start: 179, end: 213},
		{depto: "Potosí", start: 215, end: 256},
		{depto: "Tarija", start: 258, end: 268},
		{depto: "Santa Cruz", start: 270, end: 325},
		{depto: "Beni", start: 327, end: 346},
		{depto: "Pando", start: 348, end: 362},
	}
	for _, depRang := range deptoRanges {
		result[depRang.depto] = make([]munPob2024, depRang.end-depRang.start+1)
		for i := depRang.start; i <= depRang.end; i++ {
			result[depRang.depto][i-depRang.start] = munPob2024{
				mun: getStrVal(file, fmt.Sprintf("A%d", i)),
				pob: getIntVal(file, fmt.Sprintf("B%d", i)),
			}
		}
	}
	return result
}
