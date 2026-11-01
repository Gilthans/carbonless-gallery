import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class Cache<K, V> {
    private final Map<K, V> entries = new HashMap<>();

    public Optional<V> get(K key) {
        return Optional.ofNullable(entries.get(key));
    }

    public void put(K key, V value) {
        entries.put(key, value);
    }

    public List<V> values() {
        return List.copyOf(entries.values());
    }

    public boolean isSmall() {
        return entries.size() < 16;
    }
}
