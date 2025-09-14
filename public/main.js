const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector('#message')
// date
let currentDate = new Date().toISOString().slice(0, 10);
document.querySelector(".date").value = currentDate ;
// time
const date = new Date()
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  const localTime =  `${hours}:${minutes}:${seconds} ${ampm}`;
console.log(localTime)

let currentTime = new Date().toISOString().slice(0, 16);
document.querySelector(".time").value = localTime;

// update Data 
update.addEventListener("click", (_) => {
	fetch("/store", {
		method: "put",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: "Darth Vader",
			quote: "I find your lack of faith disturbing.",
		}),
	})
		.then((res) => {
			if (res.ok) return res.json();
		})
		.then((response) => {
			window.location.reload(true);
		});
});

// delete data

deleteButton.addEventListener("click", (_) => {
	fetch("/store", {
		method: "delete",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: "Darth Vader",
		}),
	})
		.then((res) => {
			if (res.ok) return res.json();
		})
		.then((response) => {
			if (response === "No quote to delete") {
				messageDiv.textContent = "No Darth Vader quote to delete";
			} else {
				window.location.reload(true);
			}
		});
});
 