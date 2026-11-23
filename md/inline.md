# Links and references

The [departures API](https://example.com/api/v1) serves every departure as JSON. See the [field reference][fields] for what each field means.

Partners who sync bookings should read the [integration guide](https://example.com/docs/integration-v3).

Questions go to <support@example.com> or <https://example.com/support>.

![Route map: Strandkaien, Nordnes and Askøy](img/route-map.png)

The vessel list comes from the [national ship register][register].[^reg]

The old CSV export is ~~still available for partners on the 2023 contract~~ retired since March.

## Rate limits

Each partner key may make 60 requests a minute. Bursts above that are refused with a `429`.[^burst]

[fields]: https://example.com/docs/fields-v2
[register]: https://example.com/register

[^reg]: The register is updated every night.
[^burst]: A refused request does not count towards the limit.
