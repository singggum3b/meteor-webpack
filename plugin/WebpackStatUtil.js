const I = Npm.require("immutable");
const path = Plugin.path;

WebpackStatUtil = {
	getOutputData:(target,fs,assetStat,webpackConfig) => {
		return I.fromJS(assetStat)
				.filter(function (value, key) {
					return (key == target || key.indexOf("common-") > -1)
				})
				.map((value, key)=> {
					let outputPath = path.join(webpackConfig.output.path, value.get(0));
					console.log("Attemp to read: " + outputPath);
					try {
						return I.fromJS([
							fs.readFileSync(outputPath).toString(),
							JSON.parse(fs.readFileSync(outputPath + ".map").toString())
						]);
					} catch (e) {
						throw new Error("File read failed (Bundle build failed). Check if you're missing any module..");
					}

				});
	}
};
