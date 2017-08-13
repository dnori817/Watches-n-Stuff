export default function isAdminMW(req, res, next) {
	if (req.session && req.session.isAdmin) {
		return next();
	}

	res.redirect(`/admin/login?to=${req.originalUrl}`);
}
