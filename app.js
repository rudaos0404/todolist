let todos = [];
const $ = (s) => document.querySelector(s);
const form = $("#form");
const input = $("#input");
const list = $("#list");


function render() {
  list.innerHTML = todos
    .map(t => `
      <li class="item ${t.done ? "done" : ""}" data-id="${t.id}">
        <input type="checkbox" class="chk" ${t.done ? "checked" : ""}/>
        <span class="txt">${escapeHTML(t.text)}</span>
        <button class="del">삭제</button>
      </li>
    `)
    .join("");
}

function escapeHTML(s) {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.unshift({ id: Date.now(), text, done: false });
  input.value = "";
  render();
});

list.addEventListener("click", (e) => {
  const li = e.target.closest(".item");
  if (!li) return;
  const id = Number(li.dataset.id);
  if (e.target.classList.contains("chk")) {
    const t = todos.find(x => x.id === id);
    if (t) t.done = !t.done;
    render();
  } else if (e.target.classList.contains("del")) {
    todos = todos.filter(x => x.id !== id);
    render();
  }
});

render();
