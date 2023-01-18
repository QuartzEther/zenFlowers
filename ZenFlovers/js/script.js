window.onload = startPreloadChain;

function startPreloadChain(){
	console.log('startPreloadChain');
	loadData('js/data.json');
}

function loadData(path){
	console.log('loadData');

	fetch(path)
		.then(response=>response.json())
		.then(result=>{
			return randomData(result);
		})
		.catch(error=>{
		  console.log(error);
		})
}

function randomData(data){
	const statement = data.statements[Math.floor(Math.random() * Object.keys(data.statements).length+1)];
	const pict =  Object.keys(data.pictures[statement.img]).length>1 ? 
			data.pictures[statement.img][Math.floor(Math.random() * Object.keys(data.pictures[statement.img]).length)]
			: data.pictures[statement.img];
	
	preloadImg(pict, fillValues, statement);	
}

function preloadImg(source, callback, statement) {
	img = new Image();
	img.onload = ()=>{
		callback(statement, source);
	}
	img.src = 'img/'+ source + '.jpg';
}

function fillValues(statement, img){
	const picture = document.querySelector(".meditation-layer__img");
	picture.src = 'img/'+ img + '.jpg';

	const name = document.querySelector(".name");
	name.innerHTML = statement.sage;

	const text = document.querySelector(".meditation-layer__text");
	statement.text.split("#").forEach((p)=>{
		let paragraph = document.createElement("p");
		paragraph.className = "meditation-layer__paragraph paragraph";
        paragraph.innerHTML = p;

		text.append(paragraph);
	});

	init()
}

//-------------INIT-------------
function init()
{
	console.log(":::INIT:::");
	const loadLayer = document.querySelector('.loading-layer');
	loadLayer.style.display = 'none';
	const mainLayer = document.querySelector('.about-layer');
	mainLayer.style.display = 'flex';

	bodyListener();
	initControls();
}


function bodyListener(){
	const body = document.querySelector('.my-body');
	const mainLayer = document.querySelector('.about-layer');
	const meditationLayer = document.querySelector('.meditation-layer');

	function bodyClicked(){	
		const info = document.querySelector('.info');
		info.style.display = 'block';

		mainLayer.style.setProperty('display', 'none');
		meditationLayer.style.setProperty('display', 'flex');
		body.removeEventListener('click', bodyClicked, false);
	}
	body.addEventListener('click',bodyClicked, false);
}

function fromToDisplay(from, to, trigger){
	trigger.addEventListener('click', () =>{
		from.forEach((elem)=>elem.style.display = 'none');
		to.forEach((elem)=>elem.style.display = 'flex');
	})
}

function initControls()
{
	const container = document.querySelector('.my-body');
	const meditationLayer = document.querySelector('.meditation-layer');
	const infoLayer = document.querySelector('.info-layer');

	const info = document.querySelector('.info');
	const back = document.querySelector('.back');

	fromToDisplay([meditationLayer, info], [infoLayer, back], info);
	fromToDisplay([infoLayer, back], [meditationLayer, info], back);

	container.addEventListener('scroll', update);


}

function update() {
	const infoLayer = document.querySelector(".info-layer");
	const trigger = document.querySelector(".info-layer__tittle");
	const back = document.querySelector(".back");
	if(infoLayer.getBoundingClientRect().width<576){
		if (trigger.getBoundingClientRect().y<0){
			console.log("!");
			back.style.top = ".5rem";
			back.style.right = ".5rem";
			back.style.height = "3rem";
			back.style.width = "3rem";
		}else{
			back.style.top = "1rem";
			back.style.right = "1rem";
			back.style.height = "5rem";
			back.style.width = "5rem";
		}
	}else{
		back.style.height = "4rem";
		back.style.width = "4rem";
	}
}