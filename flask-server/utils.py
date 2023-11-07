from scipy.spatial import distance as dist


def euclidean_distance(image, top, bottom):
    height, width = image.shape[0:2]
    return dist.euclidean(
        (top.x * width, top.y * height), (bottom.x * width, bottom.y * height))


def get_aspect_ratio(image, outputs, top_bottom, left_right):
    if outputs.multi_face_landmarks:
        landmark = outputs.multi_face_landmarks[0]
        top = landmark.landmark[top_bottom[0]]
        bottom = landmark.landmark[top_bottom[1]]
        left = landmark.landmark[left_right[0]]
        right = landmark.landmark[left_right[1]]
        top_bottom_dis = euclidean_distance(image, top, bottom)
        left_right_dis = euclidean_distance(image, left, right)
        return top_bottom_dis / left_right_dis

    return None


def open_len(arr):
    y_arr = [y for _, y in arr]
    return max(y_arr) - min(y_arr)
