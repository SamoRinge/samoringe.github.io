/* 个人主页的内容源。仅添加自己的真实文章与学习记录。
 * posts 中每篇文章使用 id、title、category、date（YYYY-MM-DD）、
 * minutes、tags（数组）、excerpt、body（可信的自编 HTML）。
 * timeline 中每条记录使用 date（YYYY-MM-DD）、title、text。
 */
window.blogContent = {
  profile: { name: 'Samoringe', github: 'https://github.com/SamoRinge' },
  posts: [],
  timeline: []
};
