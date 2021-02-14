import Handlebars from "handlebars";

export default function (context, inject) {

    inject('imageTemplate', {
        getTemplateKeys,
        compileTemplate,
        fillData,
        initHelpers,

    })

    function getTemplateKeys(svgString) {
        const ast = Handlebars.parse(svgString);
        let keys = [];
        var innerIndex = 0;

        for (let i in ast.body) {
            if (ast.body[i].type === "MustacheStatement") {
                if (ast.body[i].params.length != 0) {
                    // check if there is an Helper, so get the params of the helper and not the helper name..
                    keys[innerIndex] = ast.body[i].params[0].original;
                } else {
                    // if its not a helper get the path..
                    keys[innerIndex] = ast.body[i].path.original;
                }
                // only update innderIndex when value found in iteration, else we have empty indexes..
                innerIndex++;
            }
        }
        return keys;
    }

    function compileTemplate(rawData) {
        return Handlebars.compile(rawData)
    }

    function fillData(template, rawData) {
        return template(rawData)
    }


    /**
     * Register custom Handlebars Helper
     *
     * ---
     * Example:
     * - uppercase - turns a String to uppercase
     */
    async function initHelpers() {
        Handlebars.registerHelper("uppercase", function (aString) {
            return aString.toString().toUpperCase();
        });
    }


}