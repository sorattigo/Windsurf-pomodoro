# Focus Mountain RPG

ポモドーロ法を冒険ゲーム感覚で習慣化できるアプリ

## 特徴

- 作業25分／休憩5分のポモドーロタイマーゲーム
- ハイカーが山を登るアニメーション
- ボスバトルによる集中力チャレンジ
- XPシステムとレベルアップ
- デイリークエストと実績システム
- モバイル＆PC対応

## 必要なファイル

以下のファイルが必要です：

### アセット
- `assets/background1.svg` - 山岳背景
- `assets/hiker.png` - ハイカーのキャラクター
- `assets/work.mp3` - 作業時のBGM
- `assets/break.mp3` - 休憩時のBGM
- `assets/levelUp.mp3` - レベルアップ音
- `assets/exercise/*.gif` - ストレッチアニメーション

### サウンドエフェクト
- `assets/sfx/click.mp3` - クリック音
- `assets/sfx/victory.mp3` - 勝利音
- `assets/sfx/defeat.mp3` - 敗北音

## セットアップ

1. 必要なアセットファイルを `assets` ディレクトリに配置
2. カスタマイズ可能な設定：
   - `WORK_DURATION` - 作業時間（デフォルト：25分）
   - `SHORT_BREAK` - 短い休憩時間（デフォルト：5分）
   - `LONG_BREAK` - 長い休憩時間（デフォルト：15分）
   - `CYCLES` - サイクル数（デフォルト：4）

## ローカル開発

```bash
# 任意のHTTPサーバーで起動
python3 -m http.server 8000
# または
npx serve
```

## モバイル対応

- スマートフォンでもフルスクリーン対応
- タップで操作可能
- オフライン対応（Service Worker）

## ライセンス

MIT License
