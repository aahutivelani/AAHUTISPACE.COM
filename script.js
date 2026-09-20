const posts = [
  {
    id:1, category:"psychology", read:"4 min read",
    title:"The influence of cognitive biases on everyday judgement",
    excerpt:"We like to believe we're rational creatures. Our brains have other plans.",
    body:`<p>You meet someone and immediately decide they're mean. You study for five hours and assume you know everything, only to blank in the exam. You remember one embarrassing moment from years ago but can't remember what you ate yesterday.</p><p>These aren't random glitches. Our brains use shortcuts all the time. Cognitive biases are patterns in thinking that can influence the way we interpret information, make decisions and judge ourselves and other people.</p><p>The interesting part isn't simply knowing that biases exist. It's noticing them while they're happening — in ordinary conversations, tiny decisions and the stories we tell ourselves.</p>`
  },
  {
    id:2, category:"brain", read:"2 min read",
    title:"Why does your brain remember embarrassing things?",
    excerpt:"Your brain isn't keeping a personal archive just to bully you. Probably.",
    body:`<p>Some memories seem to have an unfair amount of storage space in our heads. One awkward moment from years ago can suddenly appear in perfect detail.</p><p>Emotion can make an experience feel especially memorable, and memories are not recordings of the past. Each time we remember something, our brain reconstructs it.</p><p>So no, your brain probably isn't deliberately torturing you. It is doing something much more ordinary — deciding what feels important enough to revisit.</p>`
  },
  {
    id:3, category:"thoughts", read:"3 min read",
    title:"Maybe we aren't who we think we are",
    excerpt:"How much of our identity is actually us — and how much is the story we've built?",
    body:`<p>We spend an enormous amount of time constructing a picture of ourselves. I'm shy. I'm ambitious. I'm bad at maths. I'm the funny friend. I'm a morning person.</p><p>But people are context-sensitive. The version of you who talks for hours with a best friend can look very different from the version of you sitting silently in a new room.</p><p>Maybe identity isn't one fixed object waiting to be discovered. Maybe it's a story that keeps being edited.</p>`
  },
  {
    id:4, category:"psychology", read:"5 min read",
    title:"The strange psychology of friendship",
    excerpt:"Why do some people become part of our everyday lives almost without us noticing?",
    body:`<p>Friendship can look effortless from the outside, but it is built from hundreds of tiny interactions: shared routines, repeated conversations, inside jokes and moments of being understood.</p><p>Our social brains are constantly tracking familiarity and trust. That doesn't make friendship mechanical. If anything, it makes the ordinary parts feel more fascinating.</p><p>A person can become important through a thousand tiny moments rather than one dramatic one.</p>`
  }
];

const postsEl=document.getElementById("posts");
const search=document.getElementById("search");
const count=document.getElementById("count");
let active="all";

function render(){
  const q=search.value.toLowerCase().trim();
  const filtered=posts.filter(p=>(active==="all"||p.category===active) &&
    `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q));
  postsEl.innerHTML=filtered.map(p=>`
    <article class="post" data-id="${p.id}">
      <div><span class="tag">${p.category} · ${p.read}</span>
      <h3>${p.title}</h3><p>${p.excerpt}</p></div>
      <span class="read">read this →</span>
    </article>`).join("") || `<p>No thoughts found. Try another search.</p>`;
  count.textContent=`${filtered.length} ${filtered.length===1?"post":"posts"}`;
  document.querySelectorAll(".post").forEach(el=>el.onclick=()=>openArticle(+el.dataset.id));
}
function openArticle(id){
  const p=posts.find(x=>x.id===id);
  document.getElementById("articleContent").innerHTML=`
    <div class="article-tag">${p.category} · ${p.read}</div>
    <h2 class="article-title">${p.title}</h2>
    <div class="article-body">${p.body}</div>`;
  document.getElementById("articleDialog").showModal();
}
document.getElementById("closeArticle").onclick=()=>document.getElementById("articleDialog").close();
document.getElementById("articleDialog").addEventListener("click",e=>{if(e.target.id==="articleDialog")e.target.close()});
document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active"); active=btn.dataset.filter; render();
});
search.oninput=render;

const thoughts=[
 "why do we remember embarrassing moments from four years ago but forget what we had for lunch yesterday?",
 "how many of your opinions are actually yours — and how many did you inherit without noticing?",
 "why does music sometimes make a memory feel closer than a photograph?",
 "what if being curious is more useful than always being certain?",
 "why do we judge a person in seconds and then spend months proving ourselves right?"
];
document.getElementById("thoughtBtn").onclick=()=>{
 const el=document.getElementById("thought");
 el.style.opacity=0; setTimeout(()=>{el.textContent=thoughts[Math.floor(Math.random()*thoughts.length)];el.style.opacity=1},180);
};
document.getElementById("themeBtn").onclick=()=>{
 document.body.classList.toggle("dark");
 localStorage.setItem("aahuti-dark",document.body.classList.contains("dark"));
};
if(localStorage.getItem("aahuti-dark")==="true")document.body.classList.add("dark");
render();
