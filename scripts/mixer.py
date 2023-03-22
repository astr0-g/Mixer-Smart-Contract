import random


def split_address(address: str, num_parts: int = 6) -> list:
    address_no_prefix = address[2:]  # Remove the '0x' prefix
    total_length = len(address_no_prefix)

    split_points = sorted(random.sample(range(1, total_length), num_parts - 1))
    split_points = [0] + split_points + [total_length]

    substrings = [address_no_prefix[split_points[i]:split_points[i+1]]
                  for i in range(num_parts)]
    return substrings


address = "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"
substrings = split_address(address)
print(substrings)
