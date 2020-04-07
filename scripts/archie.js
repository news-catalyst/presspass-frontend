require('dotenv').config();
const Gootenberg = require('Gootenberg');
const fs = require('fs');

async function getDoc(){
  const goot = new Gootenberg();
  await goot.auth.jwt();

  const data = await goot.parse.archie(process.env.GDOC_ID);
  await fs.writeFileSync('public/archie.json', JSON.stringify(data));
}

getDoc();
