const requireField = fieldName => {
    return value => {
        if (String(value).length === 0 ) {
            return fieldName + ' is required'
        }
        return true
    }
}

const generatePath = (path) => {
    console.log('>>>>>>>>');
    console.log('>>>>>>>>', path);
}

module.exports = plop => {
    plop.setGenerator('component', {
        description: 'Create a component',
        // User input prompts provided as arguments to the template
        prompts: [
            {
                // Raw text input
                type: 'input',
                // Variable name for this input
                name: 'name',
                // Prompt to display on command line
                message: 'What is your component name?',
                validate: requireField('name')
            },
        ],
        actions: [
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: 'src/components/{{kebabCase name}}/{{pascalCase name}}.tsx',
                // Handlebars template used to generate content of new file
                templateFile: 'plop-templates/Component.tsx.hbs',
            },
            // {
            //     type: 'add',
            //     path: 'src/components/{{kebabCase name}}/{{pascalCase name}}.test.tsx',
            //     templateFile:
            //         'plop-templates/Component.test.tsx.hbs',
            // },

            {
                type: 'add',
                path: 'src/components/{{kebabCase name}}/index.tsx',
                templateFile: 'plop-templates/Component.index.tsx.hbs',
            },
            {
                type: 'add',
                path:
                  'src/components/{{kebabCase name}}/{{pascalCase name}}.module.scss',
                templateFile:
                  'plop-templates/Component.module.scss.hbs',
            },
            {
                // Adds an index.tsx file if it does not already exist
                type: 'add',
                path: 'src/components/index.tsx',
                templateFile: 'plop-templates/injectable-index.tsx.hbs',
                // If index.tsx already exists in this location, skip this action
                skipIfExists: true,
            },
            {
                // Action type 'append' injects a template into an existing file
                type: 'append',
                path: 'src/components/index.tsx',
                // Pattern tells plop where in the file to inject the template
                pattern: `/* PLOP_INJECT_IMPORT */`,
                template: `import {{pascalCase name}} from './{{kebabCase name}}/{{pascalCase name}}';`,
            },
            {
                type: 'append',
                path: 'src/components/index.tsx',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `\t{{pascalCase name}},`,
            },
        ],
    });

    plop.setGenerator('page', {
        description: 'Create a page',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your page path? example home/test/page or posts/[postId]',
                validate: requireField('name')
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pages/{{name}}.tsx',
                templateFile: 'plop-templates/Component.tsx.hbs',
            },
            // {
            //     type: 'add',
            //     path: 'src/pages/{{kebabCase name}}/{{pascalCase name}}.test.tsx',
            //     templateFile:
            //         'plop-templates/Component.test.tsx.hbs',
            // },
            // {
            //     type: 'add',
            //     path: 'src/pages/{{kebabCase name}}/index.tsx',
            //     templateFile: 'plop-templates/Component.index.tsx.hbs',
            // },
            // {
            //     type: 'add',
            //     path: 'src/pages/index.tsx',
            //     templateFile: 'plop-templates/injectable-index.tsx.hbs',
            //     skipIfExists: true,
            // },
            {
                type: 'add',
                path:
                  'src/styles/pages/{{pascalCase name}}.module.scss',
                templateFile:
                  'plop-templates/Component.module.scss.hbs',
            },
            // {
            //     type: 'append',
            //     path: 'src/pages/index.tsx',
            //     pattern: `/* PLOP_INJECT_IMPORT */`,
            //     template: `import {{pascalCase name}} from './{{kebabCase name}}/{{pascalCase name}}';`,
            // },
            // {
            //     type: 'append',
            //     path: 'src/pages/index.tsx',
            //     pattern: `/* PLOP_INJECT_EXPORT */`,
            //     template: `\t{{pascalCase name}},`,
            // },
        ],
    })

    plop.setGenerator('container', {
        description: 'Create a page',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your page name?',
                validate: requireField('name')
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/containers/{{kebabCase name}}/{{pascalCase name}}.tsx',
                templateFile:
                  'plop-templates/Component.tsx.hbs',
            },
            // {
            //     type: 'add',
            //     path: 'src/containers/{{kebabCase name}}/{{pascalCase name}}.test.tsx',
            //     templateFile:
            //       'plop-templates/Component.test.tsx.hbs',
            // },
            {
                type: 'add',
                path: 'src/containers/{{kebabCase name}}/index.tsx',
                templateFile: 'plop-templates/Component.index.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/containers/index.tsx',
                templateFile: 'plop-templates/injectable-index.tsx.hbs',
                skipIfExists: true,
            },
            {
                type: 'add',
                path:
                  'src/containers/{{kebabCase name}}/{{pascalCase name}}.module.scss',
                templateFile:
                  'plop-templates/Component.module.scss.hbs',
            },
            {
                type: 'append',
                path: 'src/containers/index.tsx',
                pattern: `/* PLOP_INJECT_IMPORT */`,
                template: `import {{pascalCase name}} from './{{kebabCase name}}/{{pascalCase name}}';`,
            },
            {
                type: 'append',
                path: 'src/containers/index.tsx',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `\t{{pascalCase name}},`,
            },
        ],
    })

    // plop.setGenerator('redux saga', {
    //     description: 'Create a saga index',
    //     // User input prompts provided as arguments to the template
    //     prompts: [
    //         {
    //             // Raw text input
    //             type: 'input',
    //             // Variable name for this input
    //             name: 'name',
    //             // Prompt to display on command line
    //             message: 'What is your saga index name?',
    //             validate: requireField('name')
    //         },
    //     ],
    //     actions: [
    //         {
    //             // Add a new file
    //             type: 'add',
    //             // Path for the new file
    //             path: 'src/index/saga/{{camelCase name}}.saga.ts',
    //             // Handlebars template used to generate content of new file
    //             templateFile: 'plop-templates/Saga.ts.hbs',
    //         },
    //         {
    //             // Action type 'append' injects a template into an existing file
    //             type: 'append',
    //             path: 'src/index/saga/appRoutes.ts',
    //             // Pattern tells plop where in the file to inject the template
    //             pattern: `/* PLOP_INJECT_IMPORT */`,
    //             template: `import { {{camelCase name}}Watcher } from './{{camelCase name}}.saga';`,
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/index/saga/appRoutes.ts',
    //             pattern: `/* PLOP_INJECT_FUNC */`,
    //             template: `\t{{camelCase name}}Watcher(),`,
    //         },
    //         // {
    //         //     type: 'add',
    //         //     path: 'src/components/{{kebabCase name}}/{{pascalCase name}}.test.tsx',
    //         //     templateFile:
    //         //       'plop-templates/Component.test.jsx.hbs',
    //         // },
    //         //
    //         // {
    //         //     type: 'add',
    //         //     path: 'src/components/{{kebabCase name}}/index.tsx',
    //         //     templateFile: 'plop-templates/Component.index.tsx.hbs',
    //         // },
    //
    //         // {
    //         //     type: 'append',
    //         //     path: 'src/assets/styles/main.scss',
    //         //     pattern: `/* PLOP_INJECT_IMPORT */`,
    //         //     template: `@import './components/{{kebabCase name}}';`,
    //         // },
    //     ],
    // });
};
