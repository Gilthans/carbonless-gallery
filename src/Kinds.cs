namespace Gallery;

public static class Kinds
{
    private const string Name = "kinds";
    private const string Extra = "c";

    // The plain kinds and the extra one, in any case.
    private static readonly HashSet<string> Plain = new(["a", "b", Extra], StringComparer.OrdinalIgnoreCase);

    public static bool IsPlain(string kind)
    {
        return Plain.Contains(kind);
    }
}
