import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
    locale: 'en',
    messages: {
        ja: { 
            'hello': 'こんにちは！',
            'Search User': 'ユーザー検索',
            'Status post': 'こんにちは、何を考えていますか？',
            'Drag drop status': 'ここにドラッグ＆ドロップする、またはクリックしてファイルを追加する',
            'Post': '投稿',
            'Navbar/Home page': 'ホームページ',
            'Navbar/My page': 'マイページ',
            'Navbar/Edit user': '設定',
            'Navbar/Log out': 'ログアウト',
            'UserPage/Posts': '投稿',
            'UserPage/Followes': 'フォロワ―',
            'UserPage/Following': 'フォロー中',
            'Leave comment': 'コメントする',
            'Button/Like': 'いいね!',
            'Button/Edit user': '設定',
            'Button/Follow': 'フォローする',
            'Button/Following': 'フォロー中',
            'Button/Send': '送る',
            'Suggest friends': 'あなたにおすすめ友達',

        },
        en: { 
            'hello': 'hello',
            'Search User': 'Search User',
            'Status post': 'Hello, What are you thinking?',
            'Drag drop status': 'Drop file here or click to upload',
            'Post': 'Post',
            'Navbar/Home page': 'Home page',
            'Navbar/My page': 'My Page',
            'Navbar/Edit user': 'Edit User',
            'Navbar/Log out': 'Log out',
            'Leave comment': 'leave a comment',
            'UserPage/Posts': 'posts',
            'UserPage/Followes': 'followes',
            'UserPage/Following': 'following',
            'Button/Like': 'Like',
            'Button/Edit user': 'Edit User',
            'Button/Follow': 'Follow',
            'Button/Following': 'Following',
            'Button/Send': 'Send',
            'Suggest friends': 'Suggest friends for you',
        }
    }
})