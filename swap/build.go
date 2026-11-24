package swap

func build(opts Options) {
	buildPackage("server", opts, twice)
	kept()
	buildPackage("web", opts, twice)
}
