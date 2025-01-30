const fs = require("fs").promises;
const Handlebars = require("handlebars");
const minify = require('html-minifier').minify;

async function renderTemplate(templatePath, dataPath, outputPath) {
    try {
        console.log(`Rendering: ${templatePath} + ${dataPath} -> ${outputPath}`);

        // Read and compile Handlebars template
        const templateSource = await fs.readFile(templatePath, "utf-8");
        const template = Handlebars.compile(templateSource);

        // Read and parse JSON
        const jsonData = JSON.parse(await fs.readFile(dataPath, "utf-8"));

        // Render template w/ data
        let outputHtml = template(jsonData);

        // Minify
        outputHtml = minify(
            outputHtml,
            {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                decodeEntities: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                processScripts: ["text/html"],
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeTagWhitespace: true, // Might result in invalid HTML
                sortAttributes: true,
                sortClassName: true,
                trimCustomFragments: true,
                useShortDoctype: true
            }
        );

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
