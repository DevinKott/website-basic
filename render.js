const fs = require("fs").promises;
const Handlebars = require("handlebars");

async function renderTemplate(templatePath, dataPath, outputPath) {
    try {
        console.log(`Rendering: ${templatePath} + ${dataPath} -> ${outputPath}`);

        // Read and compile Handlebars template
        const templateSource = await fs.readFile(templatePath, "utf-8");
        const template = Handlebars.compile(templateSource);

        // Read and parse JSON
        const jsonData = JSON.parse(await fs.readFile(dataPath, "utf-8"));

        // Render template w/ data
        const outputHtml = template(jsonData);

        // Write output to file
        await fs.writeFile(outputPath, outputHtml);
        console.log(`Successfully generated ${outputPath}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

// Read in CLI args
const [
    ,, templatePath = "template.hbs",
    dataPath = "data.json",
    outputPath = "index.html"
] = process.argv;

// Render call
renderTemplate(templatePath, dataPath, outputPath);
