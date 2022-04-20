const nombres = (data) => {
	let sinespacio = data.filter((x) => !x.location.includes(" "));

	let nombre = data.filter((x) => x.location.includes(" "));

	/* Código país ISO 3166-1 alfa-2 */
	let espacioCorregido = [
		{
			location: "GB",
			confirmed: 21916961,
			deaths: 172014,
			recovered: 0,
			active: 0,
		} /*United Kingdom*/,
		{
			location: "KR",
			confirmed: 16353495,
			deaths: 21224,
			recovered: 0,
			active: 0,
		},
		{
			location: "ZA",
			confirmed: 3741230,
			deaths: 100147,
			recovered: 0,
			active: 0,
		},
		{
			location: "AE",
			confirmed: 895465,
			deaths: 2302,
			recovered: 0,
			active: 0,
		},
		{
			location: "CR",
			confirmed: 844892,
			deaths: 8357,
			recovered: 0,
			active: 0,
		},
		{
			location: "NZ",
			confirmed: 835090,
			deaths: 564,
			recovered: 0,
			active: 0,
		},
		{
			location: "SA",
			confirmed: 752572,
			deaths: 9069,
			recovered: 0,
			active: 0,
		},
		{
			location: "LK",
			confirmed: 662827,
			deaths: 16495,
			recovered: 0,
			active: 0,
		},
		{
			location: "PS",
			confirmed: 656617,
			deaths: 5656,
			recovered: 0,
			active: 0,
		},
		{
			location: "DO",
			confirmed: 578733,
			deaths: 4375,
			recovered: 0,
			active: 0,
		},
		{
			location: "BA",
			confirmed: 376437,
			deaths: 15749,
			recovered: 0,
			active: 0,
		},
		{
			location: "MK",
			confirmed: 308605,
			deaths: 9261,
			recovered: 0,
			active: 0,
		},
		{
			location: "SV",
			confirmed: 162089,
			deaths: 4125,
			recovered: 0,
			active: 0,
		},
		{
			location: "TT",
			confirmed: 142222,
			deaths: 3800,
			recovered: 0,
			active: 0,
		},
		{
			location: "CD",
			confirmed: 87023,
			deaths: 1337,
			recovered: 0,
			active: 0,
		},
		{
			location: "CI",
			confirmed: 81857,
			deaths: 797,
			recovered: 0,
			active: 0,
		},
		{
			location: "CV",
			confirmed: 55990,
			deaths: 401,
			recovered: 0,
			active: 0,
		},
		{
			location: "PG",
			confirmed: 43660,
			deaths: 649,
			recovered: 0,
			active: 0,
		},
		{
			location: "CG",
			confirmed: 24079,
			deaths: 385,
			recovered: 0,
			active: 0,
		},
		{
			location: "LC",
			confirmed: 23094,
			deaths: 367,
			recovered: 0,
			active: 0,
		},
		{
			location: "BF",
			confirmed: 20865,
			deaths: 383,
			recovered: 0,
			active: 0,
		},
		{
			location: "SS",
			confirmed: 17369,
			deaths: 138,
			recovered: 0,
			active: 0,
		},
		{
			location: "GQ",
			confirmed: 15906,
			deaths: 183,
			recovered: 0,
			active: 0,
		},
		{
			location: "SM",
			confirmed: 15874,
			deaths: 114,
			recovered: 0,
			active: 0,
		},
		{
			location: "CF",
			confirmed: 14649,
			deaths: 113,
			recovered: 0,
			active: 0,
		},
		{
			location: "SB",
			confirmed: 12437,
			deaths: 139,
			recovered: 0,
			active: 0,
		},
		{
			location: "VC",
			confirmed: 8348,
			deaths: 106,
			recovered: 0,
			active: 0,
		},
		{
			location: "SL",
			confirmed: 7681,
			deaths: 125,
			recovered: 0,
			active: 0,
		},
		{
			location: "AG",
			confirmed: 7539,
			deaths: 135,
			recovered: 0,
			active: 0,
		},
		{
			location: "ST",
			confirmed: 5948,
			deaths: 73,
			recovered: 0,
			active: 0,
		},
		{
			location: "KN",
			confirmed: 5559,
			deaths: 43,
			recovered: 0,
			active: 0,
		},
		/* {
			location: "Summer Olympics 2020",
			confirmed: 865,
			deaths: 0,
			recovered: 0,
			active: 0,
		},
		{
			location: "Diamond Princess",
			confirmed: 712,
			deaths: 13,
			recovered: 0,
			active: 0,
		},
		{
			location: "Winter Olympics 2022",
			confirmed: 535,
			deaths: 0,
			recovered: 0,
			active: 0,
		}, */
		{
			location: "VA",
			confirmed: 29,
			deaths: 0,
			recovered: 0,
			active: 0,
		},
		/* {
			location: "MS Zaandam",
			confirmed: undefined,
			deaths: 2,
			recovered: 0,
			active: 0,
		}, */
		{
			location: "MH",
			confirmed: 9,
			deaths: 0,
			recovered: 0,
			active: 0,
		},
	];

	const todos = sinespacio.concat(espacioCorregido);

	return todos;
};

export default nombres;
