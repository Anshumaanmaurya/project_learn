/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';  // For user input
import qr from 'qr-image';         // To generate QR code
import fs from 'fs';               // To write to a file

// Prompt the user for a URL
inquirer.prompt([
  {
    type: 'input',
    name: 'url',
    message: 'Please enter the URL to generate the QR code:',
    validate: function(value) {
      if (value.trim().length) {
        return true;
      } else {
        return 'URL cannot be empty!';
      }
    }
  }
])
.then(answers => {
  const url = answers.url;

  // Generate a QR code from the URL
  const qr_svg = qr.imageSync(url, { type: 'png' });

  // Save the QR code to an image file
  fs.writeFileSync('qrcode.png', qr_svg);

  console.log('QR code has been saved as "qrcode.png".');

  // Create a text file to save the user input (the URL)
  fs.writeFileSync('user_input.txt', url);

  console.log('The URL has been saved to "user_input.txt".');
})
.catch(error => {
  console.error('Error:', error);
});
