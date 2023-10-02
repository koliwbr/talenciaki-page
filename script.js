let talenciaki = 0;
const talenciaki_cel = 700;
fetch('https://szkoly.lidl.pl/rest/s1/api/secureLogin', {
    method: 'POST',
    body: new URLSearchParams({
        'encryptData': '3DD4FB074BBBA7D3F38D7CF5CAF1A399E29E4D47E849E869D56537698629BDFB',
        'productStoreId': 'LIDL_Prod2023'
    })
}).then(e => e.json()).then(e => {
    let api_key = e['apiKey'];

    function get_talencika(ImprezaID) {
        return fetch('https://szkoly.lidl.pl/rest/s1/api/tcc/getClubInfo?partyId=' + ImprezaID + '&locale=pl', {
            headers: {
                'api_key': api_key
            }
        }).then(e => e.json()).then(e => {
            talenciaki += e['data']['totalBalance']
        })
    }
    Promise.all(location.search.replace("?","").split(',').map(id => {
        return get_talencika(parseInt(id))
    })).then(() => {
        console.log(talenciaki)
        let talenciaki_prcnt = Math.round((talenciaki / talenciaki_cel)*100)
        document.getElementById('textlvl').innerText = talenciaki + "/" + talenciaki_cel + " (" + talenciaki_prcnt + "%)"
        document.getElementById('lvl').style.width = talenciaki_prcnt +'%'
        document.getElementById('textlvl').removeAttribute('style')
    })

})

