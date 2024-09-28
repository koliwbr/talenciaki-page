let talenciaki = 0;
const talenciaki_cel = parseInt(location.search.replace("?","").split("&")[1])||2000;


const refresh = () => {
    talenciaki = 0;

    function get_talencika(ImprezaID) {
        return fetch('https://corsproxy.io/?https%3A%2F%2Flidlpl.communitytcc.com%2Fpublic-api%2Fcommunity%2F' + ImprezaID, {
        }).then(e => e.json()).then(e => {
            talenciaki += e['pointsBalance']['availableBalance']
        })
    }
    Promise.all(location.search.replace("?id=","").replace("?","").split("&")[0].split(',').map(id => {
        return get_talencika(parseInt(id))
    })).then(() => {
        console.log(talenciaki)

        let talenciaki_prcnt = Math.round((talenciaki / talenciaki_cel)*1000)/10
        document.getElementById('textlvl').innerHTML = talenciaki + "/" + talenciaki_cel + "&nbsp;(" + talenciaki_prcnt + "%)"
        document.getElementById('lvl').style.width = ((talenciaki>talenciaki_cel)?'100%':talenciaki_prcnt +'%')  
        document.getElementById('textlvl').removeAttribute('style')
    })

}
refresh()
setInterval(refresh,1000*60*2) // dwie minuty

