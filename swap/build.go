package swap

func build(opts Options) {
	buildPackage("web", opts)
	kept()
	buildPackage("server", opts)
}
