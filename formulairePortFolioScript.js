var ref = [""];
var price = [0];
var selectMenu = document.getElementsByClassName("menuSelect");
var reference = document.getElementsByName("ref");
var quantite = document.getElementsByName("qte");
var prixUnit = document.getElementsByName("prixunit");
var prixGlobal = document.getElementsByName("prixglob");
var total = document.getElementById("total");
var somme = 0;
var selectedOptions = [0];
var notSelectedOptions = [0];
var menuOptions = ["-"];
var patternArticle = /[^a-zA-Z0-9]/;
var patternPrice = /[^0-9](,[0-9]{2,2})/

function beforeGenerateInfos()
{
    var article = document.getElementById("article").value;
    var refProd = document.getElementById("referenceProd").value;
    var prixUnitProd = parseFloat(document.getElementById("prixUnitProd").value);
    if (patternArticle.test(article) || patternPrice.test(prixUnitProd) || refProd == "" || article == "" || prixUnitProd == "")
    {
        document.getElementById("recap").innerHTML = "<span>Un des champs n'est pas valide, ou est resté vide, recommencez.</span>";
        return;
    }
    else
    {
        var preLib = document.createElement("p");
        preLib.setAttribute("class", "preLib");
        document.getElementsByClassName("row")[0].appendChild(preLib);
        preLib.innerHTML = document.getElementById("article").value;

        var preRef = document.createElement("p");
        preRef.setAttribute("class", "preRef");
        document.getElementsByClassName("row")[1].appendChild(preRef);
        preRef.innerHTML = document.getElementById("referenceProd").value;

        var prePrice = document.createElement("p");
        prePrice.setAttribute("class", "prePrice");
        document.getElementsByClassName("row")[2].appendChild(prePrice);
        prePrice.innerHTML = parseFloat(document.getElementById("prixUnitProd").value).toFixed(2);

        var delInfos = document.createElement("button");
        delInfos.setAttribute("class", "delInfos");
        document.getElementsByClassName("row")[3].appendChild(delInfos);
        delInfos.innerHTML = "supprimer";
    }
}

function removeLinePreGenerateInfos(i)
{
    document.getElementsByClassName("preLib")[i].remove();
    document.getElementsByClassName("preRef")[i].remove();
    document.getElementsByClassName("prePrice")[i].remove();
    document.getElementsByClassName("delInfos")[i].remove();
}

function createOptions(i)
{
    var newArticle = document.createElement("option");
    newArticle.text = menuOptions[i+1];
    document.getElementsByClassName("menuSelect")[0].appendChild(newArticle)
}

function addOptionsChoice()
{
    for (i=0; i < document.getElementsByClassName("preLib").length; i++)
    {
        var preLibText = document.getElementsByClassName("preLib")[i].textContent;
        var preRefText = document.getElementsByClassName("preRef")[i].textContent;
        var prePriceText = parseFloat(document.getElementsByClassName("prePrice")[i].textContent);

        menuOptions.push(preLibText);
        ref.push(preRefText);
        price.push(prePriceText);
        selectedOptions.push(0);
        notSelectedOptions.push(menuOptions.length - 1);
        createOptions(i);
    }
}

function clearFields()
{
    document.getElementById("article").value = "";
    document.getElementById("referenceProd").value = "";
    document.getElementById("prixUnitProd").value = "";
}

function postGenerateDisabledButtons()
{
    document.getElementById("create").disabled = true;
    document.getElementById("addOptions").disabled = true;
    for (i=0; i < document.getElementsByClassName("delInfos").length; i++)
    {
        document.getElementsByClassName("delInfos")[i].disabled = true;
    }
    document.getElementsByClassName("menuSelect")[0].disabled = false;
    document.getElementById("addLine").disabled = false;
    document.getElementById("firstContainer").removeAttribute("class", "opacity2");
    document.getElementById("firstContainer").setAttribute("class", "firstContainer opacity1");
    document.getElementById("addAction").removeAttribute("class", "opacity2");
    document.getElementById("addAction").setAttribute("class", "addAction opacity1");
    document.getElementById("table").removeAttribute("class", "opacity2");
    document.getElementById("table").setAttribute("class", "table opacity1");
    document.getElementById("myForm").removeAttribute("class", "opacity1");
    document.getElementById("myForm").setAttribute("class", "myForm opacity2");
    document.getElementById("commandLine").removeAttribute("class", "opacity1");
    document.getElementById("commandLine").setAttribute("class", "commandLine opacity2");
}

/* Ajoute une ligne de formulaire */

function addSelect()
{
	var newSelect = document.createElement("select");
	newSelect.setAttribute("class", "menuSelect");
	document.getElementsByClassName("column")[0].appendChild(newSelect);
	for (i=0; i < menuOptions.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.text = menuOptions[i];
		newSelect.appendChild(newOption);
	}
}

function addInputRef()
{
	var newRef = document.createElement("input");
	newRef.setAttribute("name", "ref");
	newRef.setAttribute("type", "text");
	newRef.setAttribute("disabled", "");
	document.getElementsByClassName("column")[1].appendChild(newRef);
}

function addInputPrixUnit()
{
	var newPrixUnit = document.createElement("input");
	newPrixUnit.setAttribute("name", "prixunit");
	newPrixUnit.setAttribute("type", "number");
	newPrixUnit.setAttribute("value", 0);
	newPrixUnit.setAttribute("disabled", "");
	document.getElementsByClassName("column")[2].appendChild(newPrixUnit);
}

function addInputPrixGlobal()
{
	var newPrixGlobal = document.createElement("input");
	newPrixGlobal.setAttribute("name", "prixglob");
	newPrixGlobal.setAttribute("type", "number");
	newPrixGlobal.setAttribute("value", 0);
	newPrixGlobal.setAttribute("disabled", "");
	document.getElementsByClassName("column")[3].appendChild(newPrixGlobal);
}

function addInputQuantite()
{
	var newQte = document.createElement("input");
	newQte.setAttribute("name", "qte");
	newQte.setAttribute("type", "number");
	newQte.setAttribute("value", 1);
	newQte.setAttribute("min", 1)
	newQte.setAttribute("disabled", "");
	document.getElementsByClassName("column")[4].appendChild(newQte);
}

/* Rend possible ou non l'activation du bouton #addLine en fonction du nombre de ligne de formulaire (pas plus de lignes que d'options) */

function setAddLine()
{
    if (selectMenu.length >= selectMenu[0].options.length-1)
    {
        document.getElementById("addLine").disabled = true;
    }
    else
    {
        document.getElementById("addLine").disabled = false;
    }
}

/* Rend possible ou non l'activation du bouton #removeLine en fonction du nombre de ligne de formulaire (pas moins d'une ligne) */

function setRemoveLine()
{
    if(selectMenu.length > 1)
    {
        document.getElementById("removeLine").disabled = false;
    }
    else
    {
        document.getElementById("removeLine").disabled = true;
    }
}

/* Réinitialise le selectedIndex du menu qui s'apprête à être supprimé à 0 (évite que l'option reste grisée dans les autres menus select après suppression 
de la ligne du formulaire) */

function beforeRemove()
{
    selectMenu[selectMenu.length-1].selectedIndex = 0;
}

/* Retire une ligne du formulaire */

function removeLine()
{
    selectMenu[selectMenu.length-1].remove();
    reference[reference.length-1].remove();
    prixUnit[prixUnit.length-1].remove();
    prixGlobal[prixGlobal.length-1].remove();
    quantite[quantite.length-1].remove();
}

/* j = menu select où l'évènement change a eu lieu, indique globalement la ligne du formulaire où effectuer les changements.
k = index de l'option sélectionnée dans le menu select où l'évènement change a eu lieu.
On affiche dans le champ des input reference[j] et prixUnit[j] les valeurs des tableaux ref et price à l'index équivalent à k.
Calcul de prixGlobal[j] et activation de l'input quantité[j]. */

function choiceByMenu(j, k)
{
	reference[j].value = ref[k];
	prixUnit[j].value = price[k];
    prixUnit[j].value = parseFloat(prixUnit[j].value).toFixed(2);
	prixGlobal[j].value = parseFloat(prixUnit[j].value) * parseFloat(quantite[j].value);
    prixGlobal[j].value = parseFloat(prixGlobal[j].value).toFixed(2);
	quantite[j].disabled = false;
}

/* Dans le tableau selectedOptions, on remplace la valeur à l'index égal à selectMenu[j].selectedIndex par une valeur égale à selectMenu[j].selectedIndex
On compare les valeurs des deux tableaux selectedOptions et notSelectedOptions à index égal. Lorsque les valeurs sont les mêmes, les options dont l'index
correspond à l'index des valeurs sont désactivées, lorsqu'il y a différence les options sont activées. */

function optionsDisabled(j)
{
	var elem = selectMenu[j].selectedIndex;
	selectedOptions.splice(elem, 1, elem);
	for (i=0; i < selectMenu.length; i++)
	{
		for (j=1; j < notSelectedOptions.length; j++)
		{
			if (selectedOptions[j] != notSelectedOptions[j])
			{
				selectMenu[i].options[notSelectedOptions[j]].disabled = false;
			}
			if (selectedOptions[j] == notSelectedOptions[j])
			{
				selectMenu[i].options[selectedOptions[j]].disabled = true;
			}
		}
	}
}

/* Réinitialisation des valeurs des champs des input[j] dans le cas où l'option par défaut est sélectionnée */

function reinitChoice(j)
{
	reference[j].value = null;
	prixUnit[j].value = 0;
	prixGlobal[j].value = 0;
	quantite[j].disabled = true;
	quantite[j].value = 1;
}

/* La somme de la valeur de tous les champs des input prixGlobal est attribuée à la variable somme. Affichage de la valeur de somme dans le champ de 
l'input total, et réinitialisation à 0 de la variable somme. 
Réinitialise le tableau selectedOptions pour des raisons d'ordre dans les instructions (évite de faire une fonction en plus qui ira toujours juste 
après la fonction calculTotal). */

function calculTotal()
{
	for (i = 0; i < selectMenu.length; i++)
	{
		somme = somme + parseFloat(prixGlobal[i].value);
	}
	total.value = parseFloat(somme);
    total.value = Math.round(total.value * 100) / 100;
    total.value = parseFloat(total.value).toFixed(2);
	somme = 0;
    selectedOptions = [0];
    for (i = 0; i < menuOptions.length; i++)
    {
        selectedOptions.push(0);
    }
}

/* La valeur du champ de l'input prixUnit[j] multipliée par la valeur du champ quantité[j]. Le résultat est affiché dans l'input prixGlobal[j] */

function calculPrixGlobal (j)
{
	prixGlobal[j].value = parseFloat(prixUnit[j].value * quantite[j].value);
    prixGlobal[j].value = Math.round(prixGlobal[j].value * 100) / 100;
    prixGlobal[j].value = parseFloat(prixGlobal[j].value).toFixed(2);
}

/* Applique un addEventListener "change" à tous les menus select et tous les inputs quantité.
Pour les menus select :
Si une option autre que l'option par défaut est sélectionnée, on lance la fonction choiceByMenu, avec j en paramètre de fonction.
Si l'option par défaut est sélectionnée, on lance la fonction reinitChoice, avec j en paramètre de fonction.
En sortie de boucle k, on lance la fonction optionsDisabled, avec j en paramètre de fonction.
En sortie de boucles j et k, on lance la fonction calculTotal, et on remet les valeurs par défaut du tableau selectedOptions
Pour les input quantité :
On lance la fonction calculPrixGlobal, avec j en paramètre de fonction.
En sortie de boucle j, on lance la fonction calculTotal. */

function start()
{
    for (i = 0; i < selectMenu.length; i++)
    {
        selectMenu[i].addEventListener("change", function()
        {
            for (j = 0; j < selectMenu.length; j++)
            {
                for (k = 0; k < selectMenu[j].options.length; k++)
                {
                    if (selectMenu[j].options[k].selected == true && k != 0)
                    {
                        choiceByMenu(j, k);
                    }
                    else
                    {
                        if (selectMenu[j].options[k].selected == true && k == 0)
                        {
                            reinitChoice(j);
                        }
                    }
                }
                optionsDisabled(j);
            }
            calculTotal();
        })
        quantite[i].addEventListener("change", function()
        {
            for (j = 0; j < selectMenu.length; j++)
            {
                calculPrixGlobal(j);
            }
            calculTotal();
        })
    }
}

/* Applique la fonction start() au chargement de la page */

window.onload = start();

/* Applique un addEventListener au bouton #addLine. À l'évènement "click", lance les fonctions d'ajout de ligne de formulaire. Lance la fonction 
optionDisabled afin de griser les options du nouveau menu select, en fonction des options déjà sélectionnées dans les autres menus select présents 
avant l'évènement. Et lance la fonction start afin d'appliquer l'addEventListener "change" sur le nouveau menu select et le nouvel input quantite.
Active ou désactive les bouton - et + avec les fonctions setAddLine et setRemoveLine. */

/* Applique un addEventListener au bouton #removeLine. Lance la fonction beforeRemove avant de lancer la fonction optionsDisabled, afin d'éviter
que l'option sélectionnée du menu qui s'apprête à être supprimé ne reste grisée dans les autres menus restants après suppression. Lance la fonction
de suppresion de la ligne du formulaire et recalcule le total avec la fonction calculTotal. Enfin, active ou désactive les bouton - et + avec les 
fonctions setAddLine et setRemoveLine. */

/* Réinitialise l'ensemble du formulaire à l'évènement "click" du bouton #reinitAll */

/* document.getElementById("reinitAll").addEventListener("click", function()
{
	document.getElementById("myForm").reset();
}) */

document.addEventListener('click', function(e)
{
    if (e.target && e.target.className == "delInfos")
    {
        for (i = 0; i < document.getElementsByClassName("delInfos").length; i++)
        {
            if (document.getElementsByClassName("delInfos")[i] == e.target)
            {
                removeLinePreGenerateInfos(i);
            }
        }
    }

    if (e.target && e.target.id == "addLine")
    {
        addSelect();
        addInputRef();
        addInputPrixUnit();
        addInputPrixGlobal();
        addInputQuantite();
        for (j = 0; j < selectMenu.length; j++)
        {
            optionsDisabled(j)
        }
        start();
        setAddLine();
        setRemoveLine();
    }

    if (e.target && e.target.id == "removeLine")
    {
        beforeRemove();
        for (j = 0; j < selectMenu.length; j++)
        {
            optionsDisabled(j)
        }
        removeLine();
        calculTotal();
        setAddLine();
        setRemoveLine();
    }

    if (e.target && e.target.id == "addOptions")
    {
        beforeGenerateInfos();
        clearFields();
    }

    if (e.target && e.target.id == "create")
    {
        if (document.getElementsByClassName("preLib")[0] == undefined)
        {
            return;
        }
        else
        {
            addOptionsChoice();
            setAddLine();
            setRemoveLine();
            postGenerateDisabledButtons();
        }
    }

    if (e.target && e.target.id == "reInitAll")
    {
        location.reload();
    }
})