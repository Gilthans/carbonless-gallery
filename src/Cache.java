import java.util.HashMap;
import java.util.Map;

public class Cache {
    private final Map<String, Object> entries = new HashMap<>();

    public Object get(String key) {
        return entries.get(key);
    }

    public void put(String key, Object value) {
        entries.put(key, value);
    }
}
