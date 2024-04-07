"use strict";

export function arrangeBox() {
	const arrangeBox = document.querySelector(".arrangeBox");

	const arrangeBoxObj = {
		available: ["Avocado", "Kiwi", "Lime", "Melon", "Watermelon", "Grapes", "Banana"],

		selected: [],

		createContainers: function () {
			let classes = [
				"available-buttons",
				"available-wrapper",
				"transfer-buttons",
				"selected-wrapper",
				"selected-buttons",
			];
			let buttonAvailableClasses = [
				"button-available-move-up",
				"button-available-move-top",
				"button-available-move-down",
				"button-available-move-bottom",
				"button-available-add-item",
			];
			let buttonSelectedClasses = [
				"button-selected-move-up",
				"button-selected-move-top",
				"button-selected-move-down",
				"button-selected-move-bottom",
				"button-selected-add-item",
			];
			let buttonClassesTransfer = [
				"button-move-to-selected",
				"button-move-to-selected-all",
				"button-move-to-available",
				"button-move-to-available-all",
			];
			let pathIcon = [
				"./icons/move-up.svg",
				"./icons/move-top.svg",
				"./icons/move-down.svg",
				"./icons/move-bottom.svg",
				"./icons/add-item.svg",
			];
			let pathIconCenter = [
				"./icons/move-right.svg",
				"./icons/move-all-right.svg",
				"./icons/move-left.svg",
				"./icons/move-all-left.svg",
			];
			let containers = [];

			for (let i = 0; i < classes.length; i++) {
				let newContainer = document.createElement("div");
				newContainer.classList.add(classes[i]);

				switch (i) {
					case 0:
						for (let i = 0; i < buttonAvailableClasses.length; i++) {
							let buttonContainers = document.createElement("button");
							let svgIcon = document.createElement("img");

							buttonContainers.classList.add(buttonAvailableClasses[i]);

							svgIcon.src = pathIcon[i];

							buttonContainers.append(svgIcon);

							newContainer.append(buttonContainers);

						}

						break;
					case 1:
						let headerContainerAvailable = document.createElement("header");
						let inputAvailable = document.createElement("input");
						let bodyAvailable = document.createElement("section");

						headerContainerAvailable.classList.add("header-available");
						headerContainerAvailable.innerHTML = "Available";
						newContainer.append(headerContainerAvailable);

						inputAvailable.classList.add("input-available");
						inputAvailable.type = "text";
						inputAvailable.placeholder = "Search by name";

						newContainer.append(inputAvailable);

						bodyAvailable.classList.add("body-available");

						for (let i = 0; i < this.available.length; i++) {
							let containerItem = document.createElement("div");
							containerItem.classList.add("container-item");
							containerItem.id = i.toString();
							containerItem.innerHTML = this.available[i];

							bodyAvailable.append(containerItem);
						}

						newContainer.append(bodyAvailable);

						break;
					case 2:
						for (let i = 0; i < buttonClassesTransfer.length; i++) {
							let buttonContainersTransfer = document.createElement("button");
							let svgIconCenter = document.createElement("img");

							buttonContainersTransfer.classList.add(buttonClassesTransfer[i]);

							svgIconCenter.src = pathIconCenter[i];

							buttonContainersTransfer.append(svgIconCenter);

							newContainer.append(buttonContainersTransfer);
						}

						break;
					case 3:
						let headerContainerSelected = document.createElement("header");
						let bodySelected = document.createElement("section");
						let inputSelected = document.createElement("input");

						headerContainerSelected.classList.add("header-selected");
						headerContainerSelected.innerHTML = "Selected";
						newContainer.append(headerContainerSelected);

						inputSelected.classList.add("input-selected");
						inputSelected.type = "text";
						inputSelected.placeholder = "Search by name";
						newContainer.append(inputSelected);

						bodySelected.classList.add("body-selected");
						newContainer.append(bodySelected);

						break;
					case 4:
						for (let i = 0; i < buttonSelectedClasses.length; i++) {
							let buttonContainers = document.createElement("button");
							let svgIcon = document.createElement("img");

							buttonContainers.classList.add(buttonSelectedClasses[i]);

							svgIcon.src = pathIcon[i];

							buttonContainers.append(svgIcon);

							newContainer.append(buttonContainers);

						}

						break;
				}

				containers.push(newContainer);
			}

			return containers;
		},

	}

	const containers = arrangeBoxObj.createContainers();

	containers.forEach(container => {
		arrangeBox.append(container)
	});

	const bodyAvailable = document.querySelector(".body-available");
	bodyAvailable.addEventListener("click", selectElementHandler);
	const bodySelected = document.querySelector(".body-selected");
	bodySelected.addEventListener("click", selectElementHandler);

	function selectElementHandler(event) {
		if (event.target.classList.contains("container-item")){
			event.target.classList.toggle("active");

			const isSelectedElement = arrangeBoxObj.selected.find(item => +item.id === +event.target.id);

			if (isSelectedElement) {
				arrangeBoxObj.selected = arrangeBoxObj.selected.filter(item => +item.id === +event.target.id);
			} else {
				arrangeBoxObj.selected.push((event.target));
			}
		}
	}

	const buttonMoveToSelected = document.querySelector(".button-move-to-selected");
	const buttonMoveToSelectedAll = document.querySelector(".button-move-to-selected-all");
	const buttonMoveToAvailable = document.querySelector(".button-move-to-available")
	const buttonMoveToAvailableAll = document.querySelector(".button-move-to-available-all")

	buttonMoveToSelected.addEventListener("click", buttonMoveToSelectedHandler);
	buttonMoveToSelectedAll.addEventListener("click", buttonMoveToSelectedAllHandler);
	buttonMoveToAvailable.addEventListener("click", buttonMoveToAvailableHandler);
	buttonMoveToAvailableAll.addEventListener("click", buttonMoveToAvailableAllHandler);

	function updateIdAvailableContainer(){
		let currentItemsAvailable = Array.from(bodyAvailable.querySelectorAll(".container-item"));
		for (let i = 0; i < currentItemsAvailable.length; i++) {
			currentItemsAvailable[i].id = i;
		}
	}

	function updateIdSelectedContainer(){
		let currentItemsSelected = Array.from(bodySelected.querySelectorAll(".container-item"));
		for (let i = 0; i < currentItemsSelected.length; i++) {
			currentItemsSelected[i].id = i;
		}
	}

	function buttonMoveToSelectedHandler() {
		arrangeBoxObj.selected.forEach(item => {
			bodySelected.append(item);
			item.classList.remove("active");
		})

		updateIdAvailableContainer();

		updateIdSelectedContainer();

		arrangeBoxObj.selected = [];
	}

	function buttonMoveToSelectedAllHandler() {
		bodyAvailable.querySelectorAll(".container-item").forEach(item => {
			bodySelected.append(item);
			item.classList.remove("active");
		})

		updateIdSelectedContainer();

		arrangeBoxObj.selected = [];
	}

	function buttonMoveToAvailableHandler() {
		arrangeBoxObj.selected.forEach(item => {
			bodyAvailable.append(item);
			item.classList.remove("active");
		})

		updateIdSelectedContainer();

		updateIdAvailableContainer();

		arrangeBoxObj.selected = [];
	}

	function buttonMoveToAvailableAllHandler() {
		bodySelected.querySelectorAll(".container-item").forEach(item => {
			bodyAvailable.append(item);
			item.classList.remove("active");
		})

		updateIdAvailableContainer();

		arrangeBoxObj.selected = [];
	}

	const buttonAvailableMoveToUp = document.querySelector(".button-available-move-up");
	buttonAvailableMoveToUp.addEventListener("click", buttonAvailableMoveToUpHandler);

	function buttonAvailableMoveToUpHandler(event) {
		const target = event.target;
		if (target) {
			arrangeBoxObj.selected.forEach(item => {
				let currentId = +item.id;
				let currentItems = Array.from(bodyAvailable.querySelectorAll(".container-item"));
				if (currentId !== 0) {
					let updateId = currentId - 1;

					currentItems[currentId].id = updateId.toString();
					currentItems[updateId].id = currentId.toString();

					bodyAvailable.insertBefore(currentItems[currentId], currentItems[updateId]);
				}
				item.classList.remove("active");
			})
			arrangeBoxObj.selected = [];
		}
	}

	const buttonAvailableMoveToDown = document.querySelector(".button-available-move-down");
	buttonAvailableMoveToDown.addEventListener("click", buttonAvailableMoveToDownHandler);

	function buttonAvailableMoveToDownHandler(event) {
		const target = event.target;
		if (target) {
			arrangeBoxObj.selected.forEach(item => {
				let currentId = +item.id;
				let currentItems = Array.from(bodyAvailable.querySelectorAll(".container-item"));
				if (+currentId !== currentItems.length - 1) {
					let updateId = currentId + 1;

					currentItems[currentId].id = updateId;
					currentItems[updateId].id = currentId;

					bodyAvailable.insertBefore(currentItems[updateId], currentItems[currentId]);
				}
				item.classList.remove("active");
			})
			arrangeBoxObj.selected = [];
		}
	}

	const buttonAvailableMoveToTop = document.querySelector(".button-available-move-top");
	buttonAvailableMoveToTop.addEventListener("click", buttonAvailableMoveToTopHandler);

	function buttonAvailableMoveToTopHandler(event) {
		const target = event.target;
		let currentItems = Array.from(bodyAvailable.querySelectorAll(".container-item"));
		if (target) {
			arrangeBoxObj.selected.forEach(item => {
				let currentId = +item.id;
				if (currentId !== 0) {
					let updateId = 0;

					bodyAvailable.insertBefore(currentItems[currentId], currentItems[updateId]);

				}
				item.classList.remove("active");
			})

			updateIdAvailableContainer();

			arrangeBoxObj.selected = [];
		}
	}

	const buttonAvailableMoveToBottom = document.querySelector(".button-available-move-bottom");
	buttonAvailableMoveToBottom.addEventListener("click", buttonAvailableMoveToBottomHandler);

	function buttonAvailableMoveToBottomHandler(event) {
		const target = event.target;
		let currentItems = Array.from(bodyAvailable.querySelectorAll(".container-item"));
		if (target) {
			arrangeBoxObj.selected.forEach(item => {
				let currentId = +item.id;
				if (currentId !== currentItems.length - 1) {
					bodyAvailable.append(item);
				}
				item.classList.remove("active");
			})

			updateIdAvailableContainer();

			arrangeBoxObj.selected = [];
		}
	}

	const buttonSelectedMoveToUp = document.querySelector(".button-selected-move-up");
	buttonSelectedMoveToUp.addEventListener("click", buttonSelectedMoveToUpHandler);

	function buttonSelectedMoveToUpHandler(event) {
		const target = event.target;
		if (target) {
			arrangeBoxObj.selected.forEach(item => {
				let currentId = +item.id;
				let currentItems = Array.from(bodySelected.querySelectorAll(".container-item"));
				if (currentId !== 0) {
					let updateId = currentId - 1;

					currentItems[currentId].id = updateId.toString();
					currentItems[updateId].id = currentId.toString();

					bodySelected.insertBefore(currentItems[currentId], currentItems[updateId]);
				}
				item.classList.remove("active");
			})
			arrangeBoxObj.selected = [];
		}
	}

	const buttonSelectedMoveToDown = document.querySelector(".button-selected-move-down");
	buttonSelectedMoveToDown.addEventListener("click", buttonSelectedMoveToDownHandler);

	function buttonSelectedMoveToDownHandler(event) {
		const target = event.target;
		if (target) {
			arrangeBoxObj.selected.forEach(item => {
				let currentId = +item.id;
				let currentItems = Array.from(bodySelected.querySelectorAll(".container-item"));
				if (+currentId !== currentItems.length - 1) {
					let updateId = currentId + 1;

					currentItems[currentId].id = updateId;
					currentItems[updateId].id = currentId;

					bodySelected.insertBefore(currentItems[updateId], currentItems[currentId]);
				}
				item.classList.remove("active");
			})
			arrangeBoxObj.selected = [];
		}
	}

	const buttonSelectedMoveToTop = document.querySelector(".button-selected-move-top");
	buttonSelectedMoveToTop.addEventListener("click", buttonSelectedMoveToTopHandler);

	function buttonSelectedMoveToTopHandler(event) {
		const target = event.target;
		let currentItems = Array.from(bodySelected.querySelectorAll(".container-item"));
		if (target) {
			arrangeBoxObj.selected.forEach(item => {
				let currentId = +item.id;
				if (currentId !== 0) {
					let updateId = 0;

					bodySelected.insertBefore(currentItems[currentId], currentItems[updateId]);

				}
				item.classList.remove("active");
			})

			updateIdSelectedContainer();

			arrangeBoxObj.selected = [];
		}
	}

	const buttonSelectedMoveToBottom = document.querySelector(".button-selected-move-bottom");
	buttonSelectedMoveToBottom.addEventListener("click", buttonSelectedMoveToBottomHandler);

	function buttonSelectedMoveToBottomHandler(event) {
		const target = event.target;
		let currentItems = Array.from(bodySelected.querySelectorAll(".container-item"));
		if (target) {
			arrangeBoxObj.selected.forEach(item => {
				let currentId = +item.id;
				if (currentId !== currentItems.length - 1) {
					bodySelected.append(item);
				}
				item.classList.remove("active");
			})

			updateIdSelectedContainer();

			arrangeBoxObj.selected = [];
		}
	}

	const buttonAvailableAddItem = document.querySelector(".button-available-add-item");
	buttonAvailableAddItem.addEventListener("click", buttonAvailableAddItemHandler)

	function buttonAvailableAddItemHandler() {
		const availableContainer = Array.from(bodyAvailable.querySelectorAll(".container-item"));
		const addItemToAvailableContainer = document.createElement("div");

		const addRandomItems = ["Cherry", "Blueberry", "Blackberry", "Strawberry", "Raspberry"];
		const randomIndex = Math.floor(Math.random() * addRandomItems.length);

		addItemToAvailableContainer.classList.add("container-item");
		addItemToAvailableContainer.id = availableContainer.length;
		addItemToAvailableContainer.innerHTML = addRandomItems[randomIndex];

		availableContainer.push(addItemToAvailableContainer);

		bodyAvailable.append(addItemToAvailableContainer);
	}

	const buttonSelectedAddItem = document.querySelector(".button-selected-add-item");
	buttonSelectedAddItem.addEventListener("click", buttonSelectedAddItemHandler)

	function buttonSelectedAddItemHandler() {
		const selectedContainer = Array.from(bodySelected.querySelectorAll(".container-item"));
		const addItemToSecondContainer = document.createElement("div");

		const addRandomItems = ["Apple", "Orange", "Litchi", "Peach", "Pear"];
		const randomIndex = Math.floor(Math.random() * addRandomItems.length);

		addItemToSecondContainer.classList.add("container-item");
		addItemToSecondContainer.id = selectedContainer.length;
		addItemToSecondContainer.innerHTML = addRandomItems[randomIndex];

		selectedContainer.push(addItemToSecondContainer);

		bodySelected.append(addItemToSecondContainer);
	}

	const inputAvailableSearchItems = document.querySelector(".input-available");
	inputAvailableSearchItems.addEventListener("keyup", inputAvailableSearchItemsHandler);

	function inputAvailableSearchItemsHandler(){
		const availableContainer = Array.from(bodyAvailable.querySelectorAll(".container-item"));
		const searchText = inputAvailableSearchItems.value.toLowerCase();

		availableContainer.forEach(item =>{
			const itemName = item.textContent.toLowerCase();
			if(itemName.includes(searchText)){
				item.style.display = "flex";
			}else{
				item.style.display = "none";
			}
		})
	}

	const inputSelectedSearchItems = document.querySelector(".input-selected");
	inputSelectedSearchItems.addEventListener("keyup", inputSelectedSearchItemsHandler);

	function inputSelectedSearchItemsHandler(){
		const selectedContainer = Array.from(bodySelected.querySelectorAll(".container-item"));
		const searchText = inputSelectedSearchItems.value.toLowerCase();

		selectedContainer.forEach(item =>{
			const itemName = item.textContent.toLowerCase();
			if(itemName.includes(searchText)){
				item.style.display = "flex";
			}else{
				item.style.display = "none";
			}
		})
	}
}

arrangeBox();