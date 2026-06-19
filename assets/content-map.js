const contentMap = {
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["爱游戏", "推荐", "热门"],
      items: [
        { name: "新游上线", url: "https://appweb-aiyouxi.com.cn/new" },
        { name: "每日精选", url: "https://appweb-aiyouxi.com.cn/daily" }
      ]
    },
    {
      id: "strategy",
      title: "攻略专区",
      tags: ["爱游戏", "攻略", "技巧"],
      items: [
        { name: "新手入门", url: "https://appweb-aiyouxi.com.cn/guide/beginner" },
        { name: "进阶技巧", url: "https://appweb-aiyouxi.com.cn/guide/advanced" }
      ]
    },
    {
      id: "community",
      title: "玩家社区",
      tags: ["爱游戏", "社区", "讨论"],
      items: [
        { name: "热门话题", url: "https://appweb-aiyouxi.com.cn/community/hot" },
        { name: "活动中心", url: "https://appweb-aiyouxi.com.cn/community/events" }
      ]
    }
  ]
};

function searchContent(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  const results = [];

  contentMap.sections.forEach(section => {
    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerKeyword));
    const itemMatches = section.items.filter(item =>
      item.name.toLowerCase().includes(lowerKeyword) ||
      item.url.toLowerCase().includes(lowerKeyword)
    );

    if (tagMatch || itemMatches.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matchedItems: itemMatches.length > 0 ? itemMatches : section.items
      });
    }
  });

  return results;
}

function filterByTag(tag) {
  const lowerTag = tag.toLowerCase();
  return contentMap.sections.filter(section =>
    section.tags.some(t => t.toLowerCase() === lowerTag)
  );
}

function getAllTags() {
  const tagSet = new Set();
  contentMap.sections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

function getSectionById(id) {
  return contentMap.sections.find(section => section.id === id) || null;
}

function formatSearchResultsHTML(results) {
  if (results.length === 0) {
    return '<p>没有找到相关内容。</p>';
  }

  let html = '<ul>';
  results.forEach(result => {
    html += `<li><strong>${escapeHtml(result.sectionTitle)}</strong> (${escapeHtml(result.sectionId)})<ul>`;
    result.matchedItems.forEach(item => {
      html += `<li><a href="${escapeHtml(item.url)}">${escapeHtml(item.name)}</a></li>`;
    });
    html += '</ul></li>';
  });
  html += '</ul>';
  return html;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}