(() => {
  'use strict';
  const { posts, timeline, profile } = window.blogContent;
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let category = '全部';
  let expanded = false;
  let lastFocused = null;
  const dateLabel = (date) => date.replaceAll('-', '.');
  const dialog = $('#article-dialog');
  $('#article-count').textContent = posts.length;
  $('#year').textContent = new Date().getFullYear();
  document.querySelectorAll('.github-link').forEach((link) => { link.href = profile.github; });

  function renderPosts() {
    const query = $('#search').value.trim().toLocaleLowerCase();
    const filtered = posts.filter((post) => (category === '全部' || post.category === category) && [post.title, post.excerpt, ...post.tags].join(' ').toLocaleLowerCase().includes(query));
    const visible = expanded || query || category !== '全部' ? filtered : filtered.slice(0, 4);
    $('#articles').innerHTML = visible.map((post) => `<article class="post"><div class="post-meta"><time datetime="${escape(post.date)}">${dateLabel(post.date)}</time><span class="category-label">${escape(post.category)}</span></div><div class="post-body"><button class="post-title" data-post="${escape(post.id)}"><h3>${escape(post.title)}</h3><span aria-hidden="true">↗</span></button><p>${escape(post.excerpt)}</p><div class="post-bottom"><div class="tags">${post.tags.map((tag) => `<span># ${escape(tag)}</span>`).join('')}</div><span>${post.minutes} 分钟阅读</span></div></div></article>`).join('');
    $('#empty-state').hidden = filtered.length > 0;
    $('#empty-title').textContent = posts.length === 0 ? '留白，等待第一篇。' : '没有找到相关文章。';
    $('#empty-description').textContent = posts.length === 0 ? '这里还没有发布的文章。' : '试试其他关键词，或切换文章分类。';
    $('#show-all').hidden = !!query || category !== '全部' || filtered.length <= 4;
    $('#show-all').innerHTML = expanded ? '收起笔记 <span>↑</span>' : `查看全部 ${posts.length} 篇笔记 <span>↓</span>`;
  }
  document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
    category = button.dataset.category;
    document.querySelectorAll('.filter').forEach((item) => {
      const selected = item === button;
      item.classList.toggle('selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    renderPosts();
  }));
  $('#search').addEventListener('input', renderPosts);
  $('#show-all').addEventListener('click', () => { expanded = !expanded; renderPosts(); });
  $('#articles').addEventListener('click', (event) => {
    const button = event.target.closest('[data-post]');
    if (button) openPost(button.dataset.post);
  });
  function openPost(id) {
    const post = posts.find((item) => item.id === id);
    if (!post) { history.replaceState(null, '', '#writing'); return; }
    lastFocused = document.activeElement;
    $('#article-content').innerHTML = `<h2 id="dialog-title">${escape(post.title)}</h2><div class="post-meta"><time datetime="${escape(post.date)}">${dateLabel(post.date)}</time><span>·</span><span>${escape(post.category)}</span><span>·</span><span>${post.minutes} 分钟阅读</span></div>${post.body}`;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    history.replaceState(null, '', `#post/${encodeURIComponent(id)}`);
  }
  $('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (location.hash.startsWith('#post/')) history.replaceState(null, '', '#writing');
    if (lastFocused && lastFocused.isConnected) lastFocused.focus({ preventScroll: true });
  });
  function readHash() {
    if (location.hash.startsWith('#post/')) {
      try { openPost(decodeURIComponent(location.hash.slice(6))); } catch { /* Ignore malformed links. */ }
    } else if (dialog.open) dialog.close();
    document.querySelectorAll('.nav-link').forEach((link) => link.classList.toggle('active', link.hash === location.hash || (link.hash === '#writing' && (!location.hash || location.hash.startsWith('#post/')))));
  }
  addEventListener('hashchange', readHash);
  $('#learning-count').textContent = `${String(timeline.length).padStart(2, '0')} ${timeline.length === 1 ? 'ENTRY' : 'ENTRIES'}`;
  if (timeline.length) $('#timeline').innerHTML = timeline.map((item) => `<article class="timeline-item"><time datetime="${escape(item.date)}">${dateLabel(item.date)}</time><h3>${escape(item.title)}</h3><p>${escape(item.text)}</p></article>`).join('');
  renderPosts();
  readHash();
})();
