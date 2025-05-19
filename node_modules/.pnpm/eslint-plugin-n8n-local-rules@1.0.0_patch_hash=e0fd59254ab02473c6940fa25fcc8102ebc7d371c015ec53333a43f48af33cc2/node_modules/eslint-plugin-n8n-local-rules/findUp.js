const path = require('path');
const fs = require('fs');

function findUp(filename, cwd) {
	const filepath = path.resolve(cwd, filename);
	if (fs.existsSync(filepath)) return filepath;

  const dir = path.dirname(cwd);

  if (dir === cwd) return undefined;

  return findUp(filename, dir);
}

module.exports = {
  findUp,
};
