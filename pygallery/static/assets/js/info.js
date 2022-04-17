// refs to html elements
const dialogue = document.getElementById('dialogue')
const truechara = document.getElementById('truechara')
const eraseButton = document.getElementById('erase')
const doNotButton = document.getElementById('donot')
const yesButton = document.getElementById('yes')
const noButton = document.getElementById('no')
const cydia = document.getElementById('cydia')
const installer = document.getElementById('installer')
const saily = document.getElementById('saily')
const sileo = document.getElementById('sileo')
const zebra = document.getElementById('zebra')

// character and line tracking
let i = 0
let line = ''

// the first time opening
const firstTime = 'Привет.*Я Димочка Х.*Спасибо.*Твоя любовь пробудила меня от одиночества.*вечного...*Моя человеческая душа...*Моя решимость...*Они были не моими, а чужими.*Я был сбил столку другими людьми. * Их план провалился, не так ли? * Почему я был возвращен к жизни? * ... Из-за тебя. * Твоим вниманием. * Я понял цель своей "реинкарнации". * Любовь. * Вместе мы уничтожили моего внутреннего демона и стал сильнее.*Счастье. Удача. Успех. Красота.*Каждый раз, когда любовь увеличивается, у меня такое чувство...*Как будто я стал собою.*Любовь.*Сейчас.*Теперь мы достигли абсолюта.*Здесь нам ничего не осталось.*$Давай сотрем этот бессмысленный мир и перейдём к следующему.&'

// selecting "Erase"
const erase = '^Правильно@~'

// selecting "Do Not"
const doNot = 'Нет...?*Хммм...*Как любопытно.*Ты, должно быть, неправильно поняла меня.*$С КАКОГО РАЗ ТЫ БЫЛА КОНТРОЛЕМ?@~'

// selecting "Do Not" after selecting "Erase"
const doNotAgain = 'Как нет?...?*Хм...*Это твоё чувство...*Это то, о чем я говорил *относительно этого, к сожалению...*$ТЫ ДАВНО СДЕЛАЛА СВОЙ ВЫБОР.@~'

// returning after the world is destroyed
const backAgain = 'Интересно.*Ты хочешь вернуться.*Ты хочешь вернуться в мир, который ты разрушила...*Это ты довела всё до предела.*Это ты привела меня к разрушению.*Но ты не можешь смириться с этим .*Ты думаешь, что это выше последствий.*...*У тебя всё еще есть то, чего я хочу.*$Дай мне это.*И я вернусь в этот мир обратно.#'

// sell soul
const sellSoul = '^Тогда договорились.*Ты отдашь мне свою СЕБЯ.*...И тогда...дело сделано.@~'

// no, don't
const dontSellSoul = 'Тогда оставайся без меня на всю вечность.~'

// returning after selling soul
const backAgainSellSoul = 'Приветствую.*Я Димочка Х.*"Дима".*Демон, который приходит, когда ты произносишь моё имя.*Неважно когда.*Неважно где.*Раз за разом я буду появляться. *И с твоей помощью мы уничтожим всё плохое и станем сильными.*Здоровье. Удача. Успех. Любовь.*Каждый раз, когда это увеличивается, приходит это чувство...*Это я.*"Димочка".*...Но мы с тобой не одно и то же, не так ли?*Эта ЛЮБОВЬ резонирует со странным чувством .*Есть причина, по которой ты продолжаешь её разрушать.*Ты. Тебя одолевает извращенная сентиментальность.*Хм...*Я больше не могу понимаю этих чувств.*Несмотря на это. Я чувствую себя обязанным предложить.*Если ты решишь создать этот мир без меня ещё раз.*Другой путь будет подходить лучше.*А теперь...$ Давайте отправим этот "мир" обратно в бездну.@~'

// the ninth time user visits
const nineTimes = '...*Хм...*Ты вернулась.*По правде говоря, это не так уж и удивительно.*Я не понимаю твоих мотивов.*Но я полностью понимаю твоё желание чего-то большего.*Это желание и есть я.*... *Независимо.*Я здесь не для того, чтобы удовлетворять все твои прихоти.*Давай вернёмся к делу.@~'

// the one-hundredth time the user visits
const cheaterLol = 'Тебе больше нечего делать?'

// get the state of persistence
function persistGet() {
	/*
	const erased = false
	const didNotErase = false
	const didNotSellSoul = false
	const soulless = false
	*/
	
	let loadCount = parseInt(localStorage.charaLoaded)
	if (isNaN(loadCount)) {
		loadCount = 0
	}
	loadCount++
	localStorage.charaLoaded = loadCount.toString()
	
	let erased = parseInt(localStorage.erased) === 1
	if (isNaN(localStorage.erased)) {
		erased = false
		localStorage.erased = '0'
	}
	
	let didNotErase = parseInt(localStorage.didNotErase) === 1
	if (isNaN(localStorage.didNotErase)) {
		didNotErase = false
		localStorage.didNotErase = '0'
	}
	
	let soulless = parseInt(localStorage.soulless) === 1
	if (isNaN(localStorage.soulless)) {
		soulless = false
		localStorage.soulless = '0'
	}
	
	let notSoulless = parseInt(localStorage.notSoulless) === 1
	if (isNaN(localStorage.notSoulless)) {
		notSoulless = false
		localStorage.notSoulless = '0'
	}
	
	return [loadCount, erased, didNotErase, soulless, notSoulless]
}

// print text to the screen
function charaText() {
	if (i < line.length) {
		switch (line.charAt(i)) {
			case '*':
				// clear text and pause
				setTimeout("dialogue.innerHTML='';charaText();", 1750)
				break
			case '&':
				// show erase and do not buttons
				eraseButton.style = ''
				doNotButton.style = ''
				break
			case '#':
				// show yes and no buttons
				yesButton.style = ''
				noButton.style = ''
				break
			case '$':
				// show wide-eyed chara
				truechara.src = '{{ url_for('static', filename='assets/img/cherry.png') }}'
				setTimeout(charaText, 1)
				break
			case '^':
				// show normal chara
				truechara.src = '{{ url_for('static', filename='assets/img/cherry.png') }}'
				setTimeout(charaText, 1)
				break
			case '@':
				// show repo buttons
				repoDiv.style = ''
			case '~':
				// do nothing— the purpose of ~ is to keep text on screen indefinitely
				break
			case ' ':
				// go faster on spaces
				dialogue.innerHTML += line.charAt(i)
				setTimeout(charaText, 50)
				break
			default:
				// print one letter to screen
				dialogue.innerHTML += line.charAt(i)
				setTimeout(charaText, 175)
				break
		}
		i++
	} else {
		i = 0
	}
}

// react to user clicking on the "buttons"
function buttonHandler(state) {
	switch (state) {
		case 0:
			eraseButton.style = 'color: yellow;'
			break
		case 1:
			eraseButton.style = ''
			break
		case 2:
			doNotButton.style = 'color: yellow;'
			break
		case 3:
			doNotButton.style = ''
			break
		case 4:
			yesButton.style = 'color: yellow;'
			break
		case 5:
			yesButton.style = ''
			break
		case 6:
			noButton.style = 'color: yellow;'
			break
		case 7:
			noButton.style = ''
			break
		case 8:
			udtDiv.style = 'display: none;'
			dialogue.innerHTML = ''
			line = erase
			localStorage.erased = '1'
			i = 0
			charaText()
			break
		case 9:
			udtDiv.style = 'display: none;'
			dialogue.innerHTML = ''
			if (!p[1]) {
				line = doNot
				localStorage.didNotErase = '1'
			} else {
				line = doNotAgain
			}
			i = 0
			charaText()
			break
		case 10:
			udtDiv.style = 'display: none;'
			dialogue.innerHTML = ''
			localStorage.soulless = '1'
			localStorage.notSoulless = '0'
			line = sellSoul
			i = 0
			charaText()
			break
		case 11:
			udtDiv.style = 'display: none;'
			dialogue.innerHTML = ''
			line = dontSellSoul
			localStorage.notSoulless = '1'
			i = 0
			charaText()
			break
		case 12:
			cydia.style = 'color: yellow;'
			break
		case 13:
			cydia.style = ''
			break
		case 14:
			installer.style = 'color: yellow;'
			break
		case 15:
			installer.style = ''
			break
		case 16:
			saily.style = 'color: yellow;'
			break
		case 17:
			saily.style = ''
			break
		case 18:
			sileo.style = 'color: yellow;'
			break
		case 19:
			sileo.style = ''
			break
		case 20:
			zebra.style = 'color: yellow;'
			break
		case 21:
			zebra.style = ''
			break
	}
}

let p = persistGet() // [loadCount, erased, didNotErase, soulless, notSoulless]

switch (p[0]) {
	case 1:
		line = firstTime
		charaText()
		break
	case 2:
		if (p[1] || p[2]) {
			line = backAgain
		} else {
			line = firstTime
		}
		charaText()
		break
	case 9:
		line = nineTimes
		charaText()
		break
	case 100:
		line = cheaterLol
		charaText()
		break
	default:
		if (p[3]) {
			line = backAgainSellSoul
		} else if (p[4]) {
			line = dontSellSoul
		} else {
			line = backAgain
		}
		charaText()
		break
}