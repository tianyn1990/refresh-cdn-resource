const fs = require('fs');
const opn = require('opn');

console.log(__dirname);

const targetPath = `${__dirname}/target`;

const wapTarPath = targetPath + '/m';
const wapCdnPath = 'https://w.kl.126.net/goods/dist/m';

const pcTarPath = targetPath + '/pc';
const pcCdnPath = 'https://mm.bst.126.net/goods/dist/pc';

const append = '?cache=1';

function run(basePath, tarPath, cdnPath) {
    fs.readdir(basePath, function(err, files = []) {
        if(err) throw e;
        files.forEach(fname => {
            let path = `${basePath}/${fname}`;
            fs.stat(path, (err, stats) => {
                if(err) throw err;
                if(stats.isFile()) {
                    path = path.replace(tarPath, cdnPath);
                    path += append;
                    console.log(path);
                    // opn(path, {app: ['google chrome', '--incognito']});
                } else {
                    run(path, tarPath, cdnPath);
                }
            });
        });
    })
}

run(wapTarPath, wapTarPath, wapCdnPath);
run(pcTarPath, pcTarPath, pcCdnPath);