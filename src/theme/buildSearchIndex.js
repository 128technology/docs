const lunr = require('lunr');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // to parse markdown files

// markdown files are in a directory named "docs"
const docsDirectory = path.join(process.cwd(), 'docs');

// Get file names in the docs directory
let fileNames = fs.readdirSync(docsDirectory);

fileNames = fileNames.filter(fileName => !fileName.startsWith('_'));

const documents = fileNames.map((fileName) => {
  
  // Read markdown file as string
  const filePath = path.join(docsDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Use gray-matter to parse the markdown file
  const { data, content } = matter(fileContents);
  
  // Return relevant data for the document
  return {
    id: fileName.replace(/\.md$/, ''),
    title: data.title,
    content,
    //rawContent:fileContents,
  };
});

// Define the lunr index
const idx = lunr(function () {
  this.ref('id');
  this.field('title');
  this.field('content');
  this.metadataWhitelist = ['position']

  documents.forEach((doc) => {
    try {
      this.add(doc);
      //console.log(doc.title);
    } catch (error) {
      //console.error(`Error adding document ${doc.id} to the index:`, error);
    }
  }, this);
});


console.log(matchData.metadata["hello"].content.position);
const serializedIndex = JSON.stringify(idx.toJSON());

fs.writeFileSync('searchIndex.json', serializedIndex);
fs.writeFileSync('data.json', JSON.stringify({index: idx.toJSON(), documents}));

