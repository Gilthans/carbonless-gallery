namespace Gallery;

public static class Kinds
{
    private const string Name = "kinds";

    // The plain kinds, in any case.
    private static readonly HashSet<string> Plain = new(["a", "b"], StringComparer.OrdinalIgnoreCase);

    public static bool IsPlain(string kind)
    {
        return Plain.Contains(kind);
    }
}
