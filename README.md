# React + DRF + Firebase でアプリを作成する際の覚え書き

## はじめに

先日

[未経験からweb系エンジニアになるための独学履歴~React+DRF+HerokuでTodoアプリを作る 製作記録~](https://qiita.com/shitikakei/items/b69a8805c6f9015ac5e4)

という記事を書きました。
現在これを元に就職活動をしていますが、それはそれとして今回React+DRFでアプリを作ってみたはいいものの、チュートリアルを終えてすぐに制作にかかったため逐次調べながらの作業となって、
進行がイマイチであったのともっと最適化できることもあっただろうなというものを感じていました。
そもそも、React + DRFでの制作は割とニッチなものらしくまとまった情報もなく私自身苦労したので、もし後続の方に同じ構成で制作される方がいた場合はその際の道標に(ググる際の助けに)なれればというのと、私もこれからこの2つのスキルの練度を上げていきたいと思っているので知識を整理して、定着させるという意味でも今回この記事を書いてみようかと思います。
Firebaseに関しては上記の記事では採用していませんでしたが、作ってみて認証はめんどくさい(フロント+Djnagoだとさらに)と感じたのでならばこちらに任せるほうが堅いと感じたので一緒に見ていこうとおもいます。

## 1. Pipenvで環境の準備

何はともあれまずは環境の構築です。
今回はDjangoのテンプレートにReactを読み込ませる形で作成するのでとりあえずDjangoをスタートさせます。

```python

pipenv --python バージョン

```

これで任意のPythonnのバージョン指定して環境を初期化して立ち上げる。
Pipenvって何？ というところからスタートの方は以下の記事が大変わかりやすいので一読をおすすめします。
[Pipenvを使ったPython開発まとめ](https://qiita.com/y-tsutsu/items/54c10e0b2c6b565c887a)

続いて構築した環境にDjangoとDRFを入れていきます。

```python

pipenv install django djangorestframework

pipenv run django-admin startproject config

```

`startproject`のあとは任意の名前で構いませんが、settings.py他プロジェクトの大本の設定を担うフォルダになるのでそれとわかるようなものにするのがよろしいそうです。

## 2. frontendフォルダ作成・React導入

まずは新規アプリフォルダを立ち上げます、Reactがここに入るのでフォルダ名はそれとわかるようなものがいいでしょう

```python

pipenv run django-admin startapp frontend

```

frontendフォルダにReactを導入します。

```terminal

# 初期化、つまりはnode_modulesをカレントディレクトリに入れる。これをやらないと以下のコマンドを実行できない。
yarn init
yarn global add create-react-app
create-react-app

```

npmでやる場合は`npm install create-react-app`などでできると思いますが、公式では`npx create-react-app`で紹介されているのでそちらでできるように準備するのが良いかと思います。

例としては

```

# 初期化、つまりはnode_modulesをカレントディレクトリに入れる。これをやらないと以下のコマンドを実行できない。
npm init

npx create-react-app my-react-app --use-npm
npm init react-app my-react-app --use-npm
yarn create react-app my-react-app --use-npm

```

といった3つのコマンドがあります、いずれも導入はnpmじゃなくてyarnでもnpmを使うように設定するコマンドです。
導入できたらまずpackage.jsonのScriptsのところにに以下の項目を追記します。

```jsx

"scripts": {
    # 以下の2項目を追加 
  "dev": "webpack --mode development ./src/index.js --output-path ./static/frontend/main.js",
  "build": "webpack --mode production ./src/index.js --output-path ./static/frontend/main.js"
}

```

次にbabelというものを入れます。
開発のときにはいらなかったのですが、デプロイするときにこれとこれに関する設定がないと詰むので入れておきましょう。

```jsx

yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react --dev

# npmの場合
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

```

設定はとりあえず以下のように。

```jsx

# デフォルトはこれ
{
    "presets": [
        "@babel/preset-env", "@babel/preset-react"
    ]
}

# herokuに上げるときはこのように書かないとうまくいかなかった

{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": true
                }
            }
        ],
        "@babel/preset-react"
    ]
}

```

次にReact関連のモジュールを入れます、ただ`create-react-app`した場合はいらないみたいです。

```jsx

yarn add react react-dom --dev
npm i react react-dom --save-dev

```

あとはwebpackについての設定を作ればひとまずおしまいです。

```jsx

const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  entry: {
    frontend: "./src/index.js",
  },
  plugins: [
    // To strip all locales except “en”
    new MomentLocalesPlugin(),

    // Or: To strip all locales except “en”, “es-us” and “ru”
    // (“en” is built into Moment and can’t be removed)
    new MomentLocalesPlugin({
      localesToKeep: ["es-us", "ja"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};


```

少し調べてみると`create-react-app`は手軽にReactを導入するためのコマンドではあるが、細かいところの設定はあまり考慮されていないということみたいです。
つまるところここまでやってきたことは`create-react-app`に頼らずにReactを導入するための手順のいくつかということになり、
デプロイする場合はbabelrcやwebpack.config.jsを適宜自分で書かないといけないということです、ここが難しい……別途また勉強が必要ですね。
ともあれ、デプロイせず単なるlocalでReactを触るというだけなら`create-react-app`だけでも大丈夫なので安心してください。
さて、これでReactは導入できたので


Djangoプロジェクト立ち上げ(configフォルダ)
↓
frontendフォルダ作成
↓
React HookとMaterial UIとGoogle Books APIsで書籍検索の簡単なアプリを作ってみる。
↓
Djangoと連携、DRFと共にフロントの実行結果等をDBに保存したりできるようにする
↓
できればテストや認証を組み込む


