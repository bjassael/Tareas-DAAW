
const dreamsList = document.getElementById("dreams-list");
const refreshButton = document.getElementById("refresh-data");


function appendNewDream(dream) {
  const newListItem = document.getElementById("dream-item-clone-default").cloneNode(true);
  newListItem.style.display = "block";
  newListItem.removeAttribute("id");
  newListItem.getElementsByClassName("author")[0].innerText = dream.title;
  newListItem.getElementsByTagName("p")[0].innerText = dream.content;
  dreamsList.appendChild(newListItem);
}

function getDreamsFromNetwork() {
  fetch("/dreams")
    .then(response => {
      const dataTime = new Date(parseInt(response.headers.get("Sent"))) ;
      const minutesPassedSinceUpdate = (Date.now() - dataTime)/1000/60;
      if (minutesPassedSinceUpdate < 1) {
        document.getElementById("last-updated").innerText = 'Now';
      } else {
        document.getElementById("last-updated").innerText = `Since ${Math.round(minutesPassedSinceUpdate)} mins.`
      }
      return response.json();
    })
    .then(dreams => {
      dreamsList.innerHTML = "";
      dreams.dreams.forEach(appendNewDream);
      refreshButton.innerText = "Update!";
    }).catch(() => {
      return null;
    });
}


function getDreamsFromCache() {
  if (!('caches' in window)) {
    return null;
  }

  return caches.match("/dreams")
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch(() => {
      return null;
    });
}

function updateData() {

  // fetch the initial list of dreams
  refreshButton.innerText = "loading...";

  // stale-while-revalidated
  getDreamsFromCache();
  getDreamsFromNetwork();

}

function handleNetworkChange() {
  document.getElementById("status-label").style.display = "none";
  if (!navigator.onLine) {
    document.getElementById("status-label").style.display = "block";
    document.querySelector('.add-button').style.display = "none";
  }
}

function init() {
  updateData();
  handleNetworkChange();

  //  Listeners
  refreshButton.addEventListener("click", updateData);
  window.addEventListener("online", handleNetworkChange);
  window.addEventListener("offline", handleNetworkChange);
}

init();