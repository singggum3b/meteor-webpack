const I = Npm.require("immutable");
const path = Plugin.path;

WebpackStatUtil = {
	getOutputData:(target,fs,assetStat,webpackConfig) => {
		return I.fromJS(assetStat)
				.filter(function (value, key) {
					return (key == target || key.indexOf("common-") > -1)
				})
				.map((value, key)=> {
					let outputPath = path.join(webpackConfig.output.path, value.get ? value.get(0) : value);
					console.log("Attemp to read: " + outputPath);
					try {
						let map;
						try {
							map = JSON.parse(fs.readFileSync(outputPath + ".map").toString());
						} catch (e) {
							console.log("External source map not found. \n")
						}

						if (webpackConfig.devtool && map) {
							return I.fromJS([
								fs.readFileSync(outputPath).toString(),
								map
							]);
						} else {
							return I.fromJS([fs.readFileSync(outputPath).toString()]);
						}
					} catch (e) {
						console.log("File read failed (Bundle build failed). Check if you're missing any module..");
						throw e;
					}

				});
	}
};
