import random

address = "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"
address_no_prefix = address[2:]
order = "xrwzsvyut"


def split_address(address: str, num_parts: int = 9) -> list:
    min_chars = len(address) // num_parts
    extra_chars = len(address) % num_parts
    indices = random.sample(range(1, num_parts), extra_chars)
    indices.sort()

    parts = []
    prev_index = 0
    for i, index in enumerate(indices):
        if i == 0:
            part_len = index * min_chars
        else:
            part_len = (index - indices[i - 1]) * min_chars
        parts.append(address[prev_index:prev_index + part_len])
        prev_index += part_len
        parts.append(address[prev_index:prev_index + 1])
        prev_index += 1
    parts.append(address[prev_index:])

    return parts


parts = split_address(address_no_prefix)
print(parts)
