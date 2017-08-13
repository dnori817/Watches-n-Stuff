export default function(res, title, page, data = {}) {
	res.render("template", { title, page, data });
}
