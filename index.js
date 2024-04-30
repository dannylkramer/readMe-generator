const inquirer = require('inquirer'); // Dependency for user prompts

// Function to generate the README content
function generateReadme(answers) {
  // Destructure user input
  const { title, description, installation, usage, license, contributing, tests, questionsUsername, questionsEmail } = answers;

  // License badge generation based on user selection
  let licenseBadge = '';
  switch (license) {
    case 'MIT':
      licenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]';
      break;
    case 'Apache':
      licenseBadge = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)]';
      break;
    // Add more cases for other licenses
    default:
      break;
  }

  let tableOfContents = `## Table of Contents\n`;
  tableOfContents += `* [Description](#description)\n`;
  tableOfContents += `* [Installation](#installation)\n`;
  tableOfContents += `* [Usage](#usage)\n`;
  tableOfContents += `* [License](#license)\n`;
  tableOfContents += `* [Contributing](#contributing)\n`; // Always include Contributing
  tableOfContents += `* [Tests](#tests)\n`; // Always include Tests
  tableOfContents += `* [Questions](#questions)\n`;
  
  // Generate README markdown content
  let readme = ''; // Initialize readme as an empty string
  readme += `${licenseBadge}\n`;
  readme += `# ${title}\n`; // Use template literal here
  readme += `${description}\n\n`;
  readme += tableOfContents + '\n';
  readme += `## Description\n`;
  readme += `${description}\n`;
  readme += `## Installation\n`;
  readme += `${installation}\n`;
  readme += `## Usage\n`;
  readme += `${usage}\n\n`;
  readme += `## License\n`;
  readme += `${licenseBadge}\n`;
  readme += `This project is licensed under the ${license} License.\n\n`;
  readme += `## Contributing\n`;
  readme += `${contributing}\n`;
  readme += `## Tests\n`;
  readme += `${tests}\n`;
  readme += `## Questions\n`;
  readme += `If you have any questions, please contact me:\n`;
  readme += `* GitHub: [${questionsUsername}](https://github.com/${questionsUsername})\n`;
  readme += `* Email: ${questionsEmail}\n`;

  return readme;
}

// User prompts using Inquirer
inquirer.prompt([
  {
    type: 'input',
    message: 'What is the title of your project?',
    name: 'title',
  },
  {
    type: 'input',
    message: 'Provide a description of your project:',
    name: 'description',
  },
  // Add more prompts for installation, usage etc. following the same pattern
  {
    type: 'list',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'Apache', 'Other'], // Add more license options here
    name: 'license',
  },
  {
    type: 'input',
    message: 'Include installation instructions:',
    name: 'installation'
  },
  {
    type: 'input',
    message: 'Add usage information for your module:',
    name: 'usage'
  },
  {
    type: 'input',
    message: 'Add contributing guidelines, should someone wish to utilize your code and add to it:',
    name: 'contributing',
  },
  {
    type: 'input',
    message: 'Include necessary test instructions:',
    name: 'tests',
  },
  {
    type: 'input',
    message: 'Enter your GitHub username:',
    name: 'questionsUsername',
  },
  {
    type: 'input',
    message: 'Enter your email address:',
    name: 'questionsEmail',
  },
])
.then((answers) => {
    const readmeContent = generateReadme(answers);
    const fs = require('fs');
    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('README.md file generated successfully!');
      }
    });
  });
