package main

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"time"
)

type PackageJSON struct {
	Name         string            `json:"name"`
	Version      string            `json:"version"`
	Description  string            `json:"description"`
	Scripts      map[string]string `json:"scripts"`
	Dependencies map[string]string `json:"dependencies"`
}

func main() {
	fmt.Println("\033[31mChecking for outdated dependencies and scripts...\033[0m")
	for i := 0; i < 10; i++ {
		fmt.Print(".")
		time.Sleep(300 * time.Millisecond)
	}
	fmt.Println()

	yarnVersionCmd := exec.Command("yarn", "--version")
	yarnVersion, err := yarnVersionCmd.Output()
	if err != nil {
		fmt.Println("Error checking Yarn version:", err)
		return
	}
	fmt.Printf("\033[36mYarn Version:\033[0m %s\n", strings.TrimSpace(string(yarnVersion)))

	nodeVersionCmd := exec.Command("node", "--version")
	nodeVersion, err := nodeVersionCmd.Output()
	if err != nil {
		fmt.Println("Error checking Node.js version:", err)
		return
	}
	fmt.Printf("\033[36mNode.js Version:\033[0m %s\n", strings.TrimSpace(string(nodeVersion)))

	cmd := exec.Command("yarn", "outdated")
	output, err := cmd.CombinedOutput()
	if err != nil {
		fmt.Println("Error running yarn outdated:", err)
		return
	}

	outputStr := string(output)

	if strings.Contains(outputStr, "Package") {
		fmt.Println("\033[33mOutdated dependencies:\033[0m")
		lines := strings.Split(outputStr, "\n")
		for _, line := range lines {
			if strings.TrimSpace(line) != "" {
				fmt.Println(" -", line)
			}
		}
	} else {
		fmt.Println("\033[32mAll dependencies are up to date.\033[0m")
	}

	pkgJSONFile, err := os.ReadFile("package.json")
	if err != nil {
		fmt.Println("Error reading package.json:", err)
		return
	}

	var pkgJSON PackageJSON
	if err := json.Unmarshal(pkgJSONFile, &pkgJSON); err != nil {
		fmt.Println("Error parsing package.json:", err)
		return
	}

	fmt.Println("\033[36mProject Information:\033[0m")
	fmt.Printf(" - Name: %s\n", pkgJSON.Name)
	fmt.Printf(" - Version: %s\n", pkgJSON.Version)
	fmt.Printf(" - Description: %s\n", pkgJSON.Description)

	fmt.Println("\033[33mAvailable Scripts:\033[0m")
	if len(pkgJSON.Scripts) > 0 {
		for script, cmd := range pkgJSON.Scripts {
			fmt.Printf(" - %s: %s\n", script, cmd)
		}
	} else {
		fmt.Println(" - No scripts registered.")
	}

	fmt.Println("\033[33mRegistered Dependencies:\033[0m")
	if len(pkgJSON.Dependencies) > 0 {
		for dep, version := range pkgJSON.Dependencies {
			fmt.Printf(" - %s: %s\n", dep, version)
		}
	} else {
		fmt.Println(" - No dependencies registered.")
	}
}

