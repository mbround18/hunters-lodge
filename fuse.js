const {
  FuseBox,
  WebIndexPlugin,
  SVGPlugin,
  SassPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  ImageBase64Plugin,
  QuantumPlugin
} = require('fuse-box');
const { src, task, context } = require('fuse-box/sparky');

context(
  class {
    getConfig() {
      return FuseBox.init({
        homeDir: 'src',
        output: 'dist/$name.js',
        target: 'browser@es6',
        hash: this.isProduction,
        cache: this.isProduction,
        useTypescriptCompiler: true,
        plugins: [
          [
            SassPlugin({
              importer: true,
              outputStyle: 'compressed'
            }),
            CSSResourcePlugin({ dist: 'dist/css-resources' }),
            CSSPlugin()
          ],
          ImageBase64Plugin(),
          SVGPlugin(),
          WebIndexPlugin({
            template: 'public/index.html'
          }),
          this.isProduction &&
            QuantumPlugin({
              uglify: true,
              css: true
            })
        ]
      });
    }
    createBundle(fuse) {
      const app = fuse.bundle('app');
      if (!this.isProduction) {
        app.watch();
        app.hmr();
      }
      app.instructions('>index.tsx');
      return app;
    }
  }
);

task('clean', () =>
  src('dist')
    .clean('dist')
    .exec()
);

task('create-map', () => {
  const path = require('path');
  const imageToTile = require('image-to-tile');
  const sharp = require('sharp');
  sharp(path.join(__dirname, './src/assets/imgs/worldMap.png'))
    .png({ progressive: true })
    .tile({
      depth: 'onepixel',
      layout: 'google'
    })
    .toFile(path.join(__dirname, './dist/assets') + '/map', function(
      err,
      info
    ) {
      // output.dzi is the Deep Zoom XML definition
      // output_files contains 512x512 tiles grouped by zoom level
    });
  imageToTile.default(
    path.join(__dirname, './src/assets/imgs/worldMap.png'),
    path.join(__dirname, './dist/assets')
  );
});

task('default', ['clean', 'create-map'], async context => {
  const fuse = context.getConfig();
  fuse.dev();
  context.createBundle(fuse);
  await fuse.run();
});

task('dist', ['clean', 'create-map'], async context => {
  context.isProduction = true;
  const fuse = context.getConfig();
  fuse.dev(); // remove it later

  context.createBundle(fuse);
  await fuse.run();
});
