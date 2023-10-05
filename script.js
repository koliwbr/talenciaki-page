let talenciaki = 0;
const talenciaki_cel = parseInt(location.search.replace("?","").split("&")[1])||2001;


const refresh = () => fetch('https://szkoly.lidl.pl/rest/s1/api/secureLogin', {
    method: 'POST',
    body: new URLSearchParams({
        'encryptData': '3DD4FB074BBBA7D3F38D7CF5CAF1A399E29E4D47E849E869D56537698629BDFB',
        'productStoreId': 'LIDL_Prod2023'
    })
}).then(e => e.json()).then(e => {
    let api_key = e['apiKey'];
    talenciaki = 0;

    function get_talencika(ImprezaID) {
        return fetch('https://szkoly.lidl.pl/rest/s1/api/tcc/getClubInfo?partyId=' + ImprezaID + '&locale=pl', {
            headers: {
                'api_key': api_key
            }
        }).then(e => e.json()).then(e => {
            talenciaki += e['data']['totalBalance']
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

})
refresh()
setInterval(refresh,1000*60*2) // dwie minuty

