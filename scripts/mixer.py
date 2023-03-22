input_string = "0x9fdA5BBBCEAdc9D0FAe1Ba20f870D363596320A1"
n_parts = 9

# Remove the '0x' prefix
input_string = input_string[2:]

# Calculate the length of each part
part_length = len(input_string) // n_parts
remainder = len(input_string) % n_parts

# Split the string into parts
parts = []
start = 0
for i in range(n_parts):
    length = part_length + (1 if i < remainder else 0)
    end = start + length
    parts.append(input_string[start:end])
    start = end

# Rearrange the parts according to the specified order
new_order = [6, 0, 5, 8, 1, 4, 7, 3, 2]
ordered_parts = [parts[i - 1] for i in new_order]

# Print the result
print(ordered_parts)
