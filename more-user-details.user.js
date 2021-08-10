// ==UserScript==
// @name         More User Details
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Re-adds the "Last seen" and "Member for" stats
// @author       You
// @match        https://*.stackexchange.com/users/*
// @match        https://stackoverflow.com/users/*
// @match        https://*.stackoverflow.com/users/*
// @match        https://superuser.com/users/*
// @match        https://*.superuser.com/users/*
// @match        https://serverfault.com/users/*
// @match        https://*.serverfault.com/users/*
// @match        https://stackapps.com/users/*
// @match        https://*.stackapps.com/users/*
// @match        https://askubuntu.com/users/*
// @match        https://*.askubuntu.com/users/*
// @match        https://mathoverflow.com/users/*
// @match        https://*.mathoverflow.com/users/*
// @grant        none
// ==/UserScript==

(async () => {
    if (document.querySelector(".iconCalendar")) {
        console.log("[More User Details] This user already has missing information");

        return;
    }

    console.log("[More User Details] This user needs information added");

    // Sites filter: !b1aoln_wxX1Wfj

    var site_url = location.href.split("//")[1].split("/")[0];

    var api_site_parameter = ({
        "stackoverflow.com": "stackoverflow",
        "www.stackoverflow.com": "stackoverflow",
        "facebook.stackoverflow.com": "stackoverflow",
        "serverfault.com": "serverfault",
        "superuser.com": "superuser",
        "meta.stackexchange.com": "meta",
        "webapps.stackexchange.com": "webapps",
        "nothingtoinstall.com": "webapps",
        "webapps.meta.stackexchange.com": "webapps.meta",
        "meta.nothingtoinstall.com": "webapps.meta",
        "meta.webapps.stackexchange.com": "webapps.meta",
        "gaming.stackexchange.com": "gaming",
        "arqade.com": "gaming",
        "thearqade.com": "gaming",
        "gaming.meta.stackexchange.com": "gaming.meta",
        "meta.arqade.com": "gaming.meta",
        "meta.thearqade.com": "gaming.meta",
        "meta.gaming.stackexchange.com": "gaming.meta",
        "webmasters.stackexchange.com": "webmasters",
        "webmaster.stackexchange.com": "webmasters",
        "webmasters.meta.stackexchange.com": "webmasters.meta",
        "meta.webmaster.stackexchange.com": "webmasters.meta",
        "meta.webmasters.stackexchange.com": "webmasters.meta",
        "cooking.stackexchange.com": "cooking",
        "seasonedadvice.com": "cooking",
        "cooking.meta.stackexchange.com": "cooking.meta",
        "meta.seasonedadvice.com": "cooking.meta",
        "meta.cooking.stackexchange.com": "cooking.meta",
        "gamedev.stackexchange.com": "gamedev",
        "gamedev.meta.stackexchange.com": "gamedev.meta",
        "meta.gamedev.stackexchange.com": "gamedev.meta",
        "photo.stackexchange.com": "photo",
        "photography.stackexchange.com": "photo",
        "photos.stackexchange.com": "photo",
        "photo.meta.stackexchange.com": "photo.meta",
        "meta.photography.stackexchange.com": "photo.meta",
        "meta.photos.stackexchange.com": "photo.meta",
        "meta.photo.stackexchange.com": "photo.meta",
        "stats.stackexchange.com": "stats",
        "statistics.stackexchange.com": "stats",
        "crossvalidated.com": "stats",
        "stats.meta.stackexchange.com": "stats.meta",
        "meta.statistics.stackexchange.com": "stats.meta",
        "meta.stats.stackexchange.com": "stats.meta",
        "math.stackexchange.com": "math",
        "maths.stackexchange.com": "math",
        "mathematics.stackexchange.com": "math",
        "math.meta.stackexchange.com": "math.meta",
        "meta.math.stackexchange.com": "math.meta",
        "diy.stackexchange.com": "diy",
        "diy.meta.stackexchange.com": "diy.meta",
        "meta.diy.stackexchange.com": "diy.meta",
        "meta.superuser.com": "meta.superuser",
        "meta.serverfault.com": "meta.serverfault",
        "gis.stackexchange.com": "gis",
        "gis.meta.stackexchange.com": "gis.meta",
        "meta.gis.stackexchange.com": "gis.meta",
        "tex.stackexchange.com": "tex",
        "tex.meta.stackexchange.com": "tex.meta",
        "meta.tex.stackexchange.com": "tex.meta",
        "askubuntu.com": "askubuntu",
        "ubuntu.stackexchange.com": "askubuntu",
        "meta.askubuntu.com": "meta.askubuntu",
        "meta.ubuntu.stackexchange.com": "meta.askubuntu",
        "money.stackexchange.com": "money",
        "basicallymoney.com": "money",
        "www.basicallymoney.com": "money",
        "money.meta.stackexchange.com": "money.meta",
        "meta.money.stackexchange.com": "money.meta",
        "english.stackexchange.com": "english",
        "elu.stackexchange.com": "english",
        "english.meta.stackexchange.com": "english.meta",
        "meta.english.stackexchange.com": "english.meta",
        "stackapps.com": "stackapps",
        "ux.stackexchange.com": "ux",
        "ui.stackexchange.com": "ux",
        "ux.meta.stackexchange.com": "ux.meta",
        "meta.ui.stackexchange.com": "ux.meta",
        "meta.ux.stackexchange.com": "ux.meta",
        "unix.stackexchange.com": "unix",
        "linux.stackexchange.com": "unix",
        "unix.meta.stackexchange.com": "unix.meta",
        "meta.linux.stackexchange.com": "unix.meta",
        "meta.unix.stackexchange.com": "unix.meta",
        "wordpress.stackexchange.com": "wordpress",
        "wordpress.meta.stackexchange.com": "wordpress.meta",
        "meta.wordpress.stackexchange.com": "wordpress.meta",
        "cstheory.stackexchange.com": "cstheory",
        "cstheory.meta.stackexchange.com": "cstheory.meta",
        "meta.cstheory.stackexchange.com": "cstheory.meta",
        "apple.stackexchange.com": "apple",
        "askdifferent.com": "apple",
        "apple.meta.stackexchange.com": "apple.meta",
        "meta.apple.stackexchange.com": "apple.meta",
        "rpg.stackexchange.com": "rpg",
        "rpg.meta.stackexchange.com": "rpg.meta",
        "meta.rpg.stackexchange.com": "rpg.meta",
        "bicycles.stackexchange.com": "bicycles",
        "bicycle.stackexchange.com": "bicycles",
        "cycling.stackexchange.com": "bicycles",
        "bikes.stackexchange.com": "bicycles",
        "bicycles.meta.stackexchange.com": "bicycles.meta",
        "meta.bicycle.stackexchange.com": "bicycles.meta",
        "meta.bicycles.stackexchange.com": "bicycles.meta",
        "softwareengineering.stackexchange.com": "softwareengineering",
        "programmer.stackexchange.com": "softwareengineering",
        "programmers.stackexchange.com": "softwareengineering",
        "softwareengineering.meta.stackexchange.com": "softwareengineering.meta",
        "meta.programmers.stackexchange.com": "softwareengineering.meta",
        "meta.softwareengineering.stackexchange.com": "softwareengineering.meta",
        "electronics.stackexchange.com": "electronics",
        "chiphacker.com": "electronics",
        "www.chiphacker.com": "electronics",
        "electronics.meta.stackexchange.com": "electronics.meta",
        "meta.electronics.stackexchange.com": "electronics.meta",
        "android.stackexchange.com": "android",
        "android.meta.stackexchange.com": "android.meta",
        "meta.android.stackexchange.com": "android.meta",
        "boardgames.stackexchange.com": "boardgames",
        "boardgame.stackexchange.com": "boardgames",
        "boardgames.meta.stackexchange.com": "boardgames.meta",
        "meta.boardgames.stackexchange.com": "boardgames.meta",
        "physics.stackexchange.com": "physics",
        "physics.meta.stackexchange.com": "physics.meta",
        "meta.physics.stackexchange.com": "physics.meta",
        "homebrew.stackexchange.com": "homebrew",
        "homebrewing.stackexchange.com": "homebrew",
        "brewadvice.com": "homebrew",
        "homebrew.meta.stackexchange.com": "homebrew.meta",
        "meta.homebrewing.stackexchange.com": "homebrew.meta",
        "meta.homebrew.stackexchange.com": "homebrew.meta",
        "security.stackexchange.com": "security",
        "itsecurity.stackexchange.com": "security",
        "security.meta.stackexchange.com": "security.meta",
        "meta.itsecurity.stackexchange.com": "security.meta",
        "meta.security.stackexchange.com": "security.meta",
        "writing.stackexchange.com": "writing",
        "writer.stackexchange.com": "writing",
        "writers.stackexchange.com": "writing",
        "writing.meta.stackexchange.com": "writing.meta",
        "meta.writing.stackexchange.com": "writing.meta",
        "meta.writers.stackexchange.com": "writing.meta",
        "writers.meta.stackexchange.com": "writing.meta",
        "video.stackexchange.com": "video",
        "avp.stackexchange.com": "video",
        "video.meta.stackexchange.com": "video.meta",
        "meta.avp.stackexchange.com": "video.meta",
        "meta.video.stackexchange.com": "video.meta",
        "graphicdesign.stackexchange.com": "graphicdesign",
        "graphicsdesign.stackexchange.com": "graphicdesign",
        "graphicdesigns.stackexchange.com": "graphicdesign",
        "graphicdesign.meta.stackexchange.com": "graphicdesign.meta",
        "meta.graphicdesign.stackexchange.com": "graphicdesign.meta",
        "dba.stackexchange.com": "dba",
        "dba.meta.stackexchange.com": "dba.meta",
        "meta.dba.stackexchange.com": "dba.meta",
        "scifi.stackexchange.com": "scifi",
        "sciencefiction.stackexchange.com": "scifi",
        "fantasy.stackexchange.com": "scifi",
        "scifi.meta.stackexchange.com": "scifi.meta",
        "meta.scifi.stackexchange.com": "scifi.meta",
        "area51.meta.stackexchange.com": "area51.meta",
        "discussion.area51.stackexchange.com": "area51.meta",
        "discussions.area51.stackexchange.com": "area51.meta",
        "discuss.area51.stackexchange.com": "area51.meta",
        "codereview.stackexchange.com": "codereview",
        "codereview.meta.stackexchange.com": "codereview.meta",
        "meta.codereview.stackexchange.com": "codereview.meta",
        "codegolf.stackexchange.com": "codegolf",
        "codegolf.meta.stackexchange.com": "codegolf.meta",
        "meta.codegolf.stackexchange.com": "codegolf.meta",
        "quant.stackexchange.com": "quant",
        "quant.meta.stackexchange.com": "quant.meta",
        "meta.quant.stackexchange.com": "quant.meta",
        "pm.stackexchange.com": "pm",
        "pm.meta.stackexchange.com": "pm.meta",
        "meta.pm.stackexchange.com": "pm.meta",
        "skeptics.stackexchange.com": "skeptics",
        "skeptic.stackexchange.com": "skeptics",
        "skepticexchange.com": "skeptics",
        "skeptics.meta.stackexchange.com": "skeptics.meta",
        "meta.skeptics.stackexchange.com": "skeptics.meta",
        "fitness.stackexchange.com": "fitness",
        "fitness.meta.stackexchange.com": "fitness.meta",
        "meta.fitness.stackexchange.com": "fitness.meta",
        "drupal.stackexchange.com": "drupal",
        "drupal.meta.stackexchange.com": "drupal.meta",
        "meta.drupal.stackexchange.com": "drupal.meta",
        "mechanics.stackexchange.com": "mechanics",
        "garage.stackexchange.com": "mechanics",
        "mechanics.meta.stackexchange.com": "mechanics.meta",
        "meta.garage.stackexchange.com": "mechanics.meta",
        "meta.mechanics.stackexchange.com": "mechanics.meta",
        "parenting.stackexchange.com": "parenting",
        "parenting.meta.stackexchange.com": "parenting.meta",
        "meta.parenting.stackexchange.com": "parenting.meta",
        "sharepoint.stackexchange.com": "sharepoint",
        "sharepointoverflow.com": "sharepoint",
        "www.sharepointoverflow.com": "sharepoint",
        "sharepoint.meta.stackexchange.com": "sharepoint.meta",
        "meta.sharepoint.stackexchange.com": "sharepoint.meta",
        "music.stackexchange.com": "music",
        "guitars.stackexchange.com": "music",
        "guitar.stackexchange.com": "music",
        "music.meta.stackexchange.com": "music.meta",
        "meta.music.stackexchange.com": "music.meta",
        "sqa.stackexchange.com": "sqa",
        "sqa.meta.stackexchange.com": "sqa.meta",
        "meta.sqa.stackexchange.com": "sqa.meta",
        "judaism.stackexchange.com": "judaism",
        "mi.yodeya.com": "judaism",
        "yodeya.com": "judaism",
        "yodeya.stackexchange.com": "judaism",
        "miyodeya.com": "judaism",
        "judaism.meta.stackexchange.com": "judaism.meta",
        "meta.judaism.stackexchange.com": "judaism.meta",
        "german.stackexchange.com": "german",
        "deutsch.stackexchange.com": "german",
        "german.meta.stackexchange.com": "german.meta",
        "meta.german.stackexchange.com": "german.meta",
        "japanese.stackexchange.com": "japanese",
        "japanese.meta.stackexchange.com": "japanese.meta",
        "meta.japanese.stackexchange.com": "japanese.meta",
        "philosophy.stackexchange.com": "philosophy",
        "philosophy.meta.stackexchange.com": "philosophy.meta",
        "meta.philosophy.stackexchange.com": "philosophy.meta",
        "gardening.stackexchange.com": "gardening",
        "landscaping.stackexchange.com": "gardening",
        "gardening.meta.stackexchange.com": "gardening.meta",
        "meta.gardening.stackexchange.com": "gardening.meta",
        "travel.stackexchange.com": "travel",
        "travel.meta.stackexchange.com": "travel.meta",
        "meta.travel.stackexchange.com": "travel.meta",
        "crypto.stackexchange.com": "crypto",
        "cryptography.stackexchange.com": "crypto",
        "crypto.meta.stackexchange.com": "crypto.meta",
        "meta.cryptography.stackexchange.com": "crypto.meta",
        "meta.crypto.stackexchange.com": "crypto.meta",
        "dsp.stackexchange.com": "dsp",
        "signals.stackexchange.com": "dsp",
        "dsp.meta.stackexchange.com": "dsp.meta",
        "meta.dsp.stackexchange.com": "dsp.meta",
        "french.stackexchange.com": "french",
        "french.meta.stackexchange.com": "french.meta",
        "meta.french.stackexchange.com": "french.meta",
        "christianity.stackexchange.com": "christianity",
        "christianity.meta.stackexchange.com": "christianity.meta",
        "meta.christianity.stackexchange.com": "christianity.meta",
        "bitcoin.stackexchange.com": "bitcoin",
        "bitcoin.meta.stackexchange.com": "bitcoin.meta",
        "meta.bitcoin.stackexchange.com": "bitcoin.meta",
        "linguistics.stackexchange.com": "linguistics",
        "linguist.stackexchange.com": "linguistics",
        "linguistics.meta.stackexchange.com": "linguistics.meta",
        "meta.linguistics.stackexchange.com": "linguistics.meta",
        "hermeneutics.stackexchange.com": "hermeneutics",
        "hermeneutics.meta.stackexchange.com": "hermeneutics.meta",
        "meta.hermeneutics.stackexchange.com": "hermeneutics.meta",
        "history.stackexchange.com": "history",
        "history.meta.stackexchange.com": "history.meta",
        "meta.history.stackexchange.com": "history.meta",
        "bricks.stackexchange.com": "bricks",
        "bricks.meta.stackexchange.com": "bricks.meta",
        "meta.bricks.stackexchange.com": "bricks.meta",
        "spanish.stackexchange.com": "spanish",
        "espanol.stackexchange.com": "spanish",
        "spanish.meta.stackexchange.com": "spanish.meta",
        "meta.spanish.stackexchange.com": "spanish.meta",
        "scicomp.stackexchange.com": "scicomp",
        "scicomp.meta.stackexchange.com": "scicomp.meta",
        "meta.scicomp.stackexchange.com": "scicomp.meta",
        "movies.stackexchange.com": "movies",
        "tv.stackexchange.com": "movies",
        "movies.meta.stackexchange.com": "movies.meta",
        "meta.tv.stackexchange.com": "movies.meta",
        "meta.movies.stackexchange.com": "movies.meta",
        "chinese.stackexchange.com": "chinese",
        "chinese.meta.stackexchange.com": "chinese.meta",
        "meta.chinese.stackexchange.com": "chinese.meta",
        "biology.stackexchange.com": "biology",
        "biology.meta.stackexchange.com": "biology.meta",
        "meta.biology.stackexchange.com": "biology.meta",
        "poker.stackexchange.com": "poker",
        "poker.meta.stackexchange.com": "poker.meta",
        "meta.poker.stackexchange.com": "poker.meta",
        "mathematica.stackexchange.com": "mathematica",
        "mathematica.meta.stackexchange.com": "mathematica.meta",
        "meta.mathematica.stackexchange.com": "mathematica.meta",
        "psychology.stackexchange.com": "psychology",
        "cogsci.stackexchange.com": "psychology",
        "psychology.meta.stackexchange.com": "psychology.meta",
        "meta.cogsci.stackexchange.com": "psychology.meta",
        "cogsci.meta.stackexchange.com": "psychology.meta",
        "outdoors.stackexchange.com": "outdoors",
        "outdoors.meta.stackexchange.com": "outdoors.meta",
        "meta.outdoors.stackexchange.com": "outdoors.meta",
        "martialarts.stackexchange.com": "martialarts",
        "martialarts.meta.stackexchange.com": "martialarts.meta",
        "meta.martialarts.stackexchange.com": "martialarts.meta",
        "sports.stackexchange.com": "sports",
        "sports.meta.stackexchange.com": "sports.meta",
        "meta.sports.stackexchange.com": "sports.meta",
        "academia.stackexchange.com": "academia",
        "academics.stackexchange.com": "academia",
        "academia.meta.stackexchange.com": "academia.meta",
        "meta.academia.stackexchange.com": "academia.meta",
        "cs.stackexchange.com": "cs",
        "computerscience.stackexchange.com": "cs",
        "cs.meta.stackexchange.com": "cs.meta",
        "meta.cs.stackexchange.com": "cs.meta",
        "workplace.stackexchange.com": "workplace",
        "workplace.meta.stackexchange.com": "workplace.meta",
        "meta.workplace.stackexchange.com": "workplace.meta",
        "windowsphone.stackexchange.com": "windowsphone",
        "windowsphone.meta.stackexchange.com": "windowsphone.meta",
        "meta.windowsphone.stackexchange.com": "windowsphone.meta",
        "chemistry.stackexchange.com": "chemistry",
        "chemistry.meta.stackexchange.com": "chemistry.meta",
        "meta.chemistry.stackexchange.com": "chemistry.meta",
        "chess.stackexchange.com": "chess",
        "chess.meta.stackexchange.com": "chess.meta",
        "meta.chess.stackexchange.com": "chess.meta",
        "raspberrypi.stackexchange.com": "raspberrypi",
        "raspberrypi.meta.stackexchange.com": "raspberrypi.meta",
        "meta.raspberrypi.stackexchange.com": "raspberrypi.meta",
        "russian.stackexchange.com": "russian",
        "russian.meta.stackexchange.com": "russian.meta",
        "meta.russian.stackexchange.com": "russian.meta",
        "islam.stackexchange.com": "islam",
        "islam.meta.stackexchange.com": "islam.meta",
        "meta.islam.stackexchange.com": "islam.meta",
        "salesforce.stackexchange.com": "salesforce",
        "salesforce.meta.stackexchange.com": "salesforce.meta",
        "meta.salesforce.stackexchange.com": "salesforce.meta",
        "patents.stackexchange.com": "patents",
        "askpatents.com": "patents",
        "askpatents.stackexchange.com": "patents",
        "patents.meta.stackexchange.com": "patents.meta",
        "meta.askpatents.com": "patents.meta",
        "meta.askpatents.stackexchange.com": "patents.meta",
        "meta.patents.stackexchange.com": "patents.meta",
        "genealogy.stackexchange.com": "genealogy",
        "genealogy.meta.stackexchange.com": "genealogy.meta",
        "meta.genealogy.stackexchange.com": "genealogy.meta",
        "robotics.stackexchange.com": "robotics",
        "robotics.meta.stackexchange.com": "robotics.meta",
        "meta.robotics.stackexchange.com": "robotics.meta",
        "expressionengine.stackexchange.com": "expressionengine",
        "expressionengine.meta.stackexchange.com": "expressionengine.meta",
        "meta.expressionengine.stackexchange.com": "expressionengine.meta",
        "politics.stackexchange.com": "politics",
        "politics.meta.stackexchange.com": "politics.meta",
        "meta.politics.stackexchange.com": "politics.meta",
        "anime.stackexchange.com": "anime",
        "anime.meta.stackexchange.com": "anime.meta",
        "meta.anime.stackexchange.com": "anime.meta",
        "magento.stackexchange.com": "magento",
        "magento.meta.stackexchange.com": "magento.meta",
        "meta.magento.stackexchange.com": "magento.meta",
        "ell.stackexchange.com": "ell",
        "ell.meta.stackexchange.com": "ell.meta",
        "meta.ell.stackexchange.com": "ell.meta",
        "sustainability.stackexchange.com": "sustainability",
        "sustainability.meta.stackexchange.com": "sustainability.meta",
        "meta.sustainability.stackexchange.com": "sustainability.meta",
        "tridion.stackexchange.com": "tridion",
        "tridion.meta.stackexchange.com": "tridion.meta",
        "meta.tridion.stackexchange.com": "tridion.meta",
        "reverseengineering.stackexchange.com": "reverseengineering",
        "reverseengineering.meta.stackexchange.com": "reverseengineering.meta",
        "meta.reverseengineering.stackexchange.com": "reverseengineering.meta",
        "networkengineering.stackexchange.com": "networkengineering",
        "networkengineering.meta.stackexchange.com": "networkengineering.meta",
        "meta.networkengineering.stackexchange.com": "networkengineering.meta",
        "opendata.stackexchange.com": "opendata",
        "opendata.meta.stackexchange.com": "opendata.meta",
        "meta.opendata.stackexchange.com": "opendata.meta",
        "freelancing.stackexchange.com": "freelancing",
        "freelancing.meta.stackexchange.com": "freelancing.meta",
        "meta.freelancing.stackexchange.com": "freelancing.meta",
        "blender.stackexchange.com": "blender",
        "blender.meta.stackexchange.com": "blender.meta",
        "meta.blender.stackexchange.com": "blender.meta",
        "mathoverflow.net": "mathoverflow.net",
        "mathoverflow.stackexchange.com": "mathoverflow.net",
        "mathoverflow.com": "mathoverflow.net",
        "meta.mathoverflow.net": "meta.mathoverflow.net",
        "space.stackexchange.com": "space",
        "thefinalfrontier.stackexchange.com": "space",
        "space.meta.stackexchange.com": "space.meta",
        "meta.space.stackexchange.com": "space.meta",
        "sound.stackexchange.com": "sound",
        "socialsounddesign.com": "sound",
        "sounddesign.stackexchange.com": "sound",
        "sound.meta.stackexchange.com": "sound.meta",
        "meta.sound.stackexchange.com": "sound.meta",
        "astronomy.stackexchange.com": "astronomy",
        "astronomy.meta.stackexchange.com": "astronomy.meta",
        "meta.astronomy.stackexchange.com": "astronomy.meta",
        "tor.stackexchange.com": "tor",
        "tor.meta.stackexchange.com": "tor.meta",
        "meta.tor.stackexchange.com": "tor.meta",
        "pets.stackexchange.com": "pets",
        "pets.meta.stackexchange.com": "pets.meta",
        "meta.pets.stackexchange.com": "pets.meta",
        "ham.stackexchange.com": "ham",
        "ham.meta.stackexchange.com": "ham.meta",
        "meta.ham.stackexchange.com": "ham.meta",
        "italian.stackexchange.com": "italian",
        "italian.meta.stackexchange.com": "italian.meta",
        "meta.italian.stackexchange.com": "italian.meta",
        "pt.stackoverflow.com": "pt.stackoverflow",
        "br.stackoverflow.com": "pt.stackoverflow",
        "stackoverflow.com.br": "pt.stackoverflow",
        "pt.meta.stackoverflow.com": "pt.meta.stackoverflow",
        "meta.br.stackoverflow.com": "pt.meta.stackoverflow",
        "meta.pt.stackoverflow.com": "pt.meta.stackoverflow",
        "aviation.stackexchange.com": "aviation",
        "aviation.meta.stackexchange.com": "aviation.meta",
        "meta.aviation.stackexchange.com": "aviation.meta",
        "ebooks.stackexchange.com": "ebooks",
        "ebooks.meta.stackexchange.com": "ebooks.meta",
        "meta.ebooks.stackexchange.com": "ebooks.meta",
        "alcohol.stackexchange.com": "alcohol",
        "beer.stackexchange.com": "alcohol",
        "dranks.stackexchange.com": "alcohol",
        "alcohol.meta.stackexchange.com": "alcohol.meta",
        "meta.beer.stackexchange.com": "alcohol.meta",
        "meta.alcohol.stackexchange.com": "alcohol.meta",
        "softwarerecs.stackexchange.com": "softwarerecs",
        "softwarerecs.meta.stackexchange.com": "softwarerecs.meta",
        "meta.softwarerecs.stackexchange.com": "softwarerecs.meta",
        "arduino.stackexchange.com": "arduino",
        "arduino.meta.stackexchange.com": "arduino.meta",
        "meta.arduino.stackexchange.com": "arduino.meta",
        "cs50.stackexchange.com": "cs50",
        "cs50.meta.stackexchange.com": "cs50.meta",
        "meta.cs50.stackexchange.com": "cs50.meta",
        "expatriates.stackexchange.com": "expatriates",
        "expats.stackexchange.com": "expatriates",
        "expatriates.meta.stackexchange.com": "expatriates.meta",
        "meta.expatriates.stackexchange.com": "expatriates.meta",
        "matheducators.stackexchange.com": "matheducators",
        "matheducators.meta.stackexchange.com": "matheducators.meta",
        "meta.matheducators.stackexchange.com": "matheducators.meta",
        "meta.stackoverflow.com": "meta.stackoverflow",
        "earthscience.stackexchange.com": "earthscience",
        "earthscience.meta.stackexchange.com": "earthscience.meta",
        "meta.earthscience.stackexchange.com": "earthscience.meta",
        "joomla.stackexchange.com": "joomla",
        "joomla.meta.stackexchange.com": "joomla.meta",
        "meta.joomla.stackexchange.com": "joomla.meta",
        "datascience.stackexchange.com": "datascience",
        "datascience.meta.stackexchange.com": "datascience.meta",
        "meta.datascience.stackexchange.com": "datascience.meta",
        "puzzling.stackexchange.com": "puzzling",
        "puzzling.meta.stackexchange.com": "puzzling.meta",
        "meta.puzzling.stackexchange.com": "puzzling.meta",
        "craftcms.stackexchange.com": "craftcms",
        "craftcms.meta.stackexchange.com": "craftcms.meta",
        "meta.craftcms.stackexchange.com": "craftcms.meta",
        "buddhism.stackexchange.com": "buddhism",
        "buddhism.meta.stackexchange.com": "buddhism.meta",
        "meta.buddhism.stackexchange.com": "buddhism.meta",
        "hinduism.stackexchange.com": "hinduism",
        "hinduism.meta.stackexchange.com": "hinduism.meta",
        "meta.hinduism.stackexchange.com": "hinduism.meta",
        "communitybuilding.stackexchange.com": "communitybuilding",
        "moderator.stackexchange.com": "communitybuilding",
        "moderators.stackexchange.com": "communitybuilding",
        "communitybuilding.meta.stackexchange.com": "communitybuilding.meta",
        "meta.moderators.stackexchange.com": "communitybuilding.meta",
        "meta.communitybuilding.stackexchange.com": "communitybuilding.meta",
        "worldbuilding.stackexchange.com": "worldbuilding",
        "worldbuilding.meta.stackexchange.com": "worldbuilding.meta",
        "meta.worldbuilding.stackexchange.com": "worldbuilding.meta",
        "ja.stackoverflow.com": "ja.stackoverflow",
        "jp.stackoverflow.com": "ja.stackoverflow",
        "ja.meta.stackoverflow.com": "ja.meta.stackoverflow",
        "meta.ja.stackoverflow.com": "ja.meta.stackoverflow",
        "emacs.stackexchange.com": "emacs",
        "emacs.meta.stackexchange.com": "emacs.meta",
        "meta.emacs.stackexchange.com": "emacs.meta",
        "hsm.stackexchange.com": "hsm",
        "hsm.meta.stackexchange.com": "hsm.meta",
        "meta.hsm.stackexchange.com": "hsm.meta",
        "economics.stackexchange.com": "economics",
        "economics.meta.stackexchange.com": "economics.meta",
        "meta.economics.stackexchange.com": "economics.meta",
        "lifehacks.stackexchange.com": "lifehacks",
        "lifehacks.meta.stackexchange.com": "lifehacks.meta",
        "meta.lifehacks.stackexchange.com": "lifehacks.meta",
        "engineering.stackexchange.com": "engineering",
        "engineering.meta.stackexchange.com": "engineering.meta",
        "meta.engineering.stackexchange.com": "engineering.meta",
        "coffee.stackexchange.com": "coffee",
        "coffee.meta.stackexchange.com": "coffee.meta",
        "meta.coffee.stackexchange.com": "coffee.meta",
        "vi.stackexchange.com": "vi",
        "vim.stackexchange.com": "vi",
        "vi.meta.stackexchange.com": "vi.meta",
        "meta.vi.stackexchange.com": "vi.meta",
        "musicfans.stackexchange.com": "musicfans",
        "musicfans.meta.stackexchange.com": "musicfans.meta",
        "meta.musicfans.stackexchange.com": "musicfans.meta",
        "woodworking.stackexchange.com": "woodworking",
        "woodworking.meta.stackexchange.com": "woodworking.meta",
        "meta.woodworking.stackexchange.com": "woodworking.meta",
        "civicrm.stackexchange.com": "civicrm",
        "civicrm.meta.stackexchange.com": "civicrm.meta",
        "meta.civicrm.stackexchange.com": "civicrm.meta",
        "medicalsciences.stackexchange.com": "medicalsciences",
        "health.stackexchange.com": "medicalsciences",
        "medicalsciences.meta.stackexchange.com": "medicalsciences.meta",
        "meta.health.stackexchange.com": "medicalsciences.meta",
        "health.meta.stackexchange.com": "medicalsciences.meta",
        "ru.stackoverflow.com": "ru.stackoverflow",
        "hashcode.ru": "ru.stackoverflow",
        "stackoverflow.ru": "ru.stackoverflow",
        "ru.meta.stackoverflow.com": "ru.meta.stackoverflow",
        "meta.hashcode.ru": "ru.meta.stackoverflow",
        "meta.ru.stackoverflow.com": "ru.meta.stackoverflow",
        "rus.stackexchange.com": "rus",
        "russ.hashcode.ru": "rus",
        "russ.stackexchange.com": "rus",
        "rus.meta.stackexchange.com": "rus.meta",
        "meta.rus.stackexchange.com": "rus.meta",
        "mythology.stackexchange.com": "mythology",
        "mythology.meta.stackexchange.com": "mythology.meta",
        "meta.mythology.stackexchange.com": "mythology.meta",
        "law.stackexchange.com": "law",
        "law.meta.stackexchange.com": "law.meta",
        "meta.law.stackexchange.com": "law.meta",
        "opensource.stackexchange.com": "opensource",
        "opensource.meta.stackexchange.com": "opensource.meta",
        "meta.opensource.stackexchange.com": "opensource.meta",
        "elementaryos.stackexchange.com": "elementaryos",
        "elementaryos.meta.stackexchange.com": "elementaryos.meta",
        "meta.elementaryos.stackexchange.com": "elementaryos.meta",
        "portuguese.stackexchange.com": "portuguese",
        "portuguese.meta.stackexchange.com": "portuguese.meta",
        "meta.portuguese.stackexchange.com": "portuguese.meta",
        "computergraphics.stackexchange.com": "computergraphics",
        "computergraphics.meta.stackexchange.com": "computergraphics.meta",
        "meta.computergraphics.stackexchange.com": "computergraphics.meta",
        "hardwarerecs.stackexchange.com": "hardwarerecs",
        "hardwarerecs.meta.stackexchange.com": "hardwarerecs.meta",
        "meta.hardwarerecs.stackexchange.com": "hardwarerecs.meta",
        "es.stackoverflow.com": "es.stackoverflow",
        "es.meta.stackoverflow.com": "es.meta.stackoverflow",
        "meta.es.stackoverflow.com": "es.meta.stackoverflow",
        "3dprinting.stackexchange.com": "3dprinting",
        "threedprinting.stackexchange.com": "3dprinting",
        "3dprinting.meta.stackexchange.com": "3dprinting.meta",
        "meta.3dprinting.stackexchange.com": "3dprinting.meta",
        "ethereum.stackexchange.com": "ethereum",
        "ethereum.meta.stackexchange.com": "ethereum.meta",
        "meta.ethereum.stackexchange.com": "ethereum.meta",
        "latin.stackexchange.com": "latin",
        "latin.meta.stackexchange.com": "latin.meta",
        "meta.latin.stackexchange.com": "latin.meta",
        "languagelearning.stackexchange.com": "languagelearning",
        "languagelearning.meta.stackexchange.com": "languagelearning.meta",
        "meta.languagelearning.stackexchange.com": "languagelearning.meta",
        "retrocomputing.stackexchange.com": "retrocomputing",
        "retrocomputing.meta.stackexchange.com": "retrocomputing.meta",
        "meta.retrocomputing.stackexchange.com": "retrocomputing.meta",
        "crafts.stackexchange.com": "crafts",
        "crafts.meta.stackexchange.com": "crafts.meta",
        "meta.crafts.stackexchange.com": "crafts.meta",
        "korean.stackexchange.com": "korean",
        "korean.meta.stackexchange.com": "korean.meta",
        "meta.korean.stackexchange.com": "korean.meta",
        "monero.stackexchange.com": "monero",
        "monero.meta.stackexchange.com": "monero.meta",
        "meta.monero.stackexchange.com": "monero.meta",
        "ai.stackexchange.com": "ai",
        "ai.meta.stackexchange.com": "ai.meta",
        "meta.ai.stackexchange.com": "ai.meta",
        "esperanto.stackexchange.com": "esperanto",
        "esperanto.meta.stackexchange.com": "esperanto.meta",
        "meta.esperanto.stackexchange.com": "esperanto.meta",
        "sitecore.stackexchange.com": "sitecore",
        "sitecore.meta.stackexchange.com": "sitecore.meta",
        "meta.sitecore.stackexchange.com": "sitecore.meta",
        "iot.stackexchange.com": "iot",
        "iot.meta.stackexchange.com": "iot.meta",
        "meta.iot.stackexchange.com": "iot.meta",
        "literature.stackexchange.com": "literature",
        "literature.meta.stackexchange.com": "literature.meta",
        "meta.literature.stackexchange.com": "literature.meta",
        "vegetarianism.stackexchange.com": "vegetarianism",
        "vegetarian.stackexchange.com": "vegetarianism",
        "veg.stackexchange.com": "vegetarianism",
        "vegetarianism.meta.stackexchange.com": "vegetarianism.meta",
        "meta.vegetarian.stackexchange.com": "vegetarianism.meta",
        "meta.vegetarianism.stackexchange.com": "vegetarianism.meta",
        "veg.meta.stackexchange.com": "vegetarianism.meta",
        "ukrainian.stackexchange.com": "ukrainian",
        "ukrainian.meta.stackexchange.com": "ukrainian.meta",
        "meta.ukrainian.stackexchange.com": "ukrainian.meta",
        "devops.stackexchange.com": "devops",
        "devops.meta.stackexchange.com": "devops.meta",
        "meta.devops.stackexchange.com": "devops.meta",
        "bioinformatics.stackexchange.com": "bioinformatics",
        "bioinformatics.meta.stackexchange.com": "bioinformatics.meta",
        "cseducators.stackexchange.com": "cseducators",
        "cseducators.meta.stackexchange.com": "cseducators.meta",
        "interpersonal.stackexchange.com": "interpersonal",
        "interpersonalskills.stackexchange.com": "interpersonal",
        "ips.stackexchange.com": "interpersonal",
        "interpersonal.meta.stackexchange.com": "interpersonal.meta",
        "interpersonalskills.meta.stackexchange.com": "interpersonal.meta",
        "ips.meta.stackexchange.com": "interpersonal.meta",
        "iota.stackexchange.com": "iota",
        "iota.meta.stackexchange.com": "iota.meta",
        "stellar.stackexchange.com": "stellar",
        "stellar.meta.stackexchange.com": "stellar.meta",
        "conlang.stackexchange.com": "conlang",
        "conlang.meta.stackexchange.com": "conlang.meta",
        "quantumcomputing.stackexchange.com": "quantumcomputing",
        "quantumcomputing.meta.stackexchange.com": "quantumcomputing.meta",
        "eosio.stackexchange.com": "eosio",
        "eosio.meta.stackexchange.com": "eosio.meta",
        "tezos.stackexchange.com": "tezos",
        "tezos.meta.stackexchange.com": "tezos.meta",
        "or.stackexchange.com": "or",
        "or.meta.stackexchange.com": "or.meta",
        "drones.stackexchange.com": "drones",
        "drones.meta.stackexchange.com": "drones.meta",
        "mattermodeling.stackexchange.com": "mattermodeling",
        "materials.stackexchange.com": "mattermodeling",
        "mattermodeling.meta.stackexchange.com": "mattermodeling.meta",
        "materials.meta.stackexchange.com": "mattermodeling.meta",
        "cardano.stackexchange.com": "cardano",
        "cardano.meta.stackexchange.com": "cardano.meta"
    })[site_url];

    var id = location.href.match(/\/users\/\d+/)[0].split("/")[2];

    console.log("[More User Details] " + api_site_parameter + " " + id);

    var api_response = await fetch("https://api.stackexchange.com/2.2/users/" + id + "?site=" + api_site_parameter + "&filter=!LnNkvuasy*9caGoi1pz-JS&key=HriNw9iEeUVfYCx5bAVsig((");

    var json = (await api_response.json()).items[0];

    console.log(json);

    var ago = (stamp) => {
        var now = Date.now() / 1000 | 0;

        var distance = now - stamp;

        if (distance < 0)
            return ["in the future", ""];

        if (distance == 0)
            return ["just now", ""];

        if (distance < 60)
            return [distance + " seconds", " ago"];

        if (distance < 3600)
            return [(distance / 60 | 0) + " minutes", " ago"];

        if (distance < 86400)
            return [(distance / 3600 | 0) + " hours", " ago"];

        var days = distance / 86400 | 0;

        if (distance <= 1)
            return ["yesterday", ""];

        if (distance < 7)
            return [days + " days", " ago"];

        if (distance < 35)
            return [(days / 7 | 0) + " weeks", " ago"];

        if (distance < 360)
            return [(days / 30 | 0) + " months", " ago"];

        if (distance < 540)
            return ["last year", ""];

        return [Math.round(days / 365.25) + " years", " ago"];
    };

    var last_seen = ago(json.last_access_date);

    var parent = document.querySelectorAll(".my16.fw-wrap")[0];

    var clone = document.querySelector(".iconCake").parentNode.parentNode.parentNode.cloneNode(true);

    clone.children[0].children[0].children[0].className = "svg-icon iconClock";
    clone.children[0].children[0].children[0].children[0].setAttribute("d", "M9 17c-4.36 0-8-3.64-8-8 0-4.36 3.64-8 8-8 4.36 0 8 3.64 8 8 0 4.36-3.64 8-8 8zm0-2c3.27 0 6-2.73 6-6s-2.73-6-6-6-6 2.73-6 6 2.73 6 6 6zM8 5h1.01L9 9.36l3.22 2.1-.6.93L8 10V5z");
    clone.children[0].children[1].childNodes[0].textContent = "Last seen ";
    clone.children[0].children[1].childNodes[1].textContent = last_seen[0];
    clone.children[0].children[1].childNodes[1].title = new Date(json.last_access_date * 1000).toISOString();
    clone.children[0].children[1].childNodes[2].textContent = last_seen[1];

    parent.children[1].appendChild(parent.children[0].children[0].cloneNode());
    parent.children[1].children[0].appendChild(clone);
})();
