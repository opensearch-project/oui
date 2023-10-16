const shell = require('shelljs');
const fs = require('fs');

/* OUI -> EUI Aliases */
function euiBuildTimeAliasTearDown() {
  console.log('Tearing down build-time EUI aliases');
  shell.rm('-rf', 'src/eui_components');

  // Remove any changes made at build time
  shell.ls('src/components/**/*.*').forEach(file => {
    if (/__snapshots__|\.d\.ts|\.test\.|\.scss/.test(file)) return;
    let changed;
    const content = fs.readFileSync(file, 'utf8')
      .replace(/\n\/\* OUI -> EUI Aliases: Build-Time \*\/.*$/mg, () => {
        changed = true;
        return '';
      });
    if (changed) fs.writeFileSync(file, content, 'utf8');
  });
}
/* End of Aliases */

module.exports = {
  euiBuildTimeAliasTearDown,
};
